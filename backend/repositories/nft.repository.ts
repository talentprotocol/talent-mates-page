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
		const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
		const selectedSkin = properties.body;
		const owner = new ethers.Wallet(WALLET_PK, provider);
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			FactoryArtifact.abi,
			provider
		);

		const accountTier = await contract
			.connect(owner)
			.checkAccountOrCodeTier(userAddress, code);

		if (!(selectedSkin < FREE_SKINS_AMOUNT || 3 + accountTier === selectedSkin)) {
			return Promise.reject({
				status: 403,
				message: "Skin locked",
			});
		}

		const isCombinationAvailable = await contract
			.connect(owner)
			.isCombinationAvailable(fileName);

		if (!isCombinationAvailable) {
			return Promise.reject({
				status: 409,
				message: "The current combination is already in use",
			});
		}
		const client = new NFTStorage({ token: TOKEN });

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
			],
		});

		// upload image to S3
		const s3 = new S3({
			apiVersion: "2006-03-01",
			accessKeyId: S3_ACCESS,
			secretAccessKey: S3_SECRET,
			region: "eu-west-2",
		});

		const blob = fs.readFileSync(`/tmp/${fileName}`);

		await s3
			.upload({
				Bucket: S3_BUCKET,
				Key: `mates/${tokenId}.png`,
				Body: blob,
			})
			.promise();

		const feeData = await provider.getFeeData();

		await contract
			.connect(owner)
			.setTokenURI(
				tokenId,
				metadata.url,
				fileName,
				signedMessageAddress,
				selectedSkin,
				{
					gasPrice: feeData.gasPrice,
				}
			);

		return Promise.resolve({
			status: 200,
			message: "successfully setted nft metadata",
		});
	} catch (error) {
		console.log("error - ", error);
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
