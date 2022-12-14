import { ethers } from "ethers";
import FactoryArtifact from "./contracts/talentNFT.json";
import { DefaultResponse } from "backend/types/response";
import { NFTStorage } from "nft.storage";
import TRAITS_LIST from "libs/traits/list.json";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const NETWORK_URL = process.env.PROVIDER_URL as string;
const TOKEN = process.env.NFT_STORAGE_TOKEN as string;

const valueToNumber = (value: number) => {
	if (value > 9) {
		return value.toString();
	} else {
		return `0${value}`;
	}
}

const propertiesToAttributes = (properties: any) => {
	return Object.keys(properties).filter((k) => k != "gender").map((key) => {
		return {
			// @ts-ignore
			"trait_type": TRAITS_LIST[key]["name"],
			// @ts-ignore
			"value": TRAITS_LIST[key][properties["gender"]][valueToNumber(properties[key])]};
	});
}

const setMetaData = async (
	fileName: string,
	image: Blob,
	tokenId: number,
	properties: any,
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
		
		// -> replace traits with attributes (check pugs example)
		const metadata = await client.store({
			name: `Talent Mate ${tokenId}`,
			description:
				"Talent Mates. An NFT collection by Talent Protocol.",
			image,
			properties: {
				type: "image",
			},
			attributes: [...propertiesToAttributes(properties), {"trait_type": "Revealed", "value": "Yes"}]
		});

		await contract.connect(owner).setTokenURI(tokenId, metadata.url, fileName, owner, selectedSkin);
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
