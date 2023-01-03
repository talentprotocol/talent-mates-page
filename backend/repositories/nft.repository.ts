import { ethers } from "ethers";
import FactoryArtifact from "./contracts/talentNFT.json";
import { DefaultResponse } from "backend/types/response";
import { NFTStorage } from "nft.storage";
import S3 from "aws-sdk/clients/s3";
import TRAITS_LIST from "libs/traits/list.json";
import fs from "fs";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const NETWORK_URL = process.env.PROVIDER_URL as string;
const TOKEN = process.env.NFT_STORAGE_TOKEN as string;
const S3_ACCESS = process.env.ACCESS_KEY as string;
const S3_SECRET = process.env.SECRET_KEY as string;
const S3_BUCKET = process.env.BUCKET_NAME as string;

const FREE_SKINS_AMOUNT = 5;

const ACCOUNT_TIER_MAP = {
	"2": 1,
	"3": 1,
	"4": 2,
	"5": 2,
	"6": 2,
	"7": 2,
	"8": 2,
	"9": 2,
	"10": 3,
	"11": 3,
	"12": 4,
};

const accountTierToCommunityLevelConverter = (accountTier: number) => {
	// @ts-ignore
	return ACCOUNT_TIER_MAP[accountTier] || "1";
};

const valueToNumber = (value: number) => {
	if (value > 9) {
		return value.toString();
	} else {
		return `0${value}`;
	}
};

const propertiesToAttributes = (properties: any) => {
	return Object.keys(properties)
		.filter((k) => k != "gender")
		.map((key) => {
			return {
				// @ts-ignore
				trait_type: TRAITS_LIST[key]["name"],
				value:
					// @ts-ignore
					TRAITS_LIST[key][properties["gender"]][
						valueToNumber(properties[key])
					],
			};
		});
};

const setMetaData = async (
	fileName: string,
	image: Blob,
	tokenId: number,
	properties: any,
	signedMessageAddress: string,
	userAddress: string,
	code?: string
): Promise<DefaultResponse> => {
	try {
		console.log("creating provider");
		const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
		const selectedSkin = properties.body;
		console.log("creating owner");
		const owner = new ethers.Wallet(WALLET_PK, provider);
		console.log("creating contract");
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			FactoryArtifact.abi,
			provider
		);
		console.log("checking account tier");
		const accountTier = await contract
			.connect(owner)
			.checkAccountOrCodeTier(userAddress, "");

		if (
			!(selectedSkin <= FREE_SKINS_AMOUNT || 3 + accountTier >= selectedSkin)
		) {
			console.log("skin is locked");
			return Promise.reject({
				status: 403,
				message: "Skin locked",
			});
		}

		console.log("creating ipfs client");
		const client = new NFTStorage({ token: TOKEN });

		console.log("setting ipfs metadata");
		const metadata = await client.store({
			name: `Talent Mate ${tokenId}`,
			description: "Talent Mates. An NFT collection by Talent Protocol.",
			image,
			properties: {
				type: "image",
			},
			attributes: [
				...propertiesToAttributes(properties),
				{ trait_type: "Revealed", value: "Yes" },
				{ trait_type: "Body", value: properties["gender"] == "female" ? 2 : 1 },
				// ALERT: check docs/invite-code before changing
				// @ts-ignore
				{
					trait_type: "Community Level",
					value: code?.includes("invite-")
						? "0"
						: accountTierToCommunityLevelConverter(accountTier),
				},
			],
		});

		console.log("creating s3 client");
		// upload image to S3
		const s3 = new S3({
			apiVersion: "2006-03-01",
			accessKeyId: S3_ACCESS,
			secretAccessKey: S3_SECRET,
			region: "eu-west-2",
		});

		console.log("converting file to blob");
		const blob = fs.readFileSync(`/tmp/${fileName}`);

		console.log("uploading to s3 bucket");
		await s3
			.upload({
				Bucket: S3_BUCKET,
				Key: `mates/${tokenId}.png`,
				Body: blob,
			})
			.promise();

		console.log("getting fee data");
		const feeData = await provider.getFeeData();

		console.log("setting tokenuri");
		await contract
			.connect(owner)
			.setTokenURI(
				tokenId,
				metadata.url,
				fileName,
				signedMessageAddress,
				selectedSkin,
				{
					gasPrice: feeData.gasPrice?.mul(2),
				}
			);

		return Promise.resolve({
			status: 200,
			message: "successfully setted nft metadata",
		});
	} catch (error) {
		console.log("error - ", error);
		const stringifyError = JSON.stringify(error);
		if (
			stringifyError.includes("max fee per gas less than block base fee")
		) {
			return Promise.reject({
				status: 500,
				message:
					"The network is very busy right now and gas estimations can not be 100% accurate, as such we were unable to change your Talent Mate, please try again",
				useMessage: true,
				error,
			});
		} else if (stringifyError.includes("user rejected transaction")) {
			return Promise.reject({
				status: 400,
				message:
					"The transaction must be accepted for the mint to be successful",
				useMessage: true,
				error,
			});
		}
		return Promise.reject({
			status: 500,
			message: "error",
			error,
		});
	}
};

export default {
	setMetaData,
};
