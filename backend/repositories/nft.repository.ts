import { ethers } from "ethers";
import FactoryArtifact from "./contracts/talentNFT.json";
import { DefaultResponse } from "backend/types/response";
import { NFTStorage } from "nft.storage";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const NETWORK_URL = process.env.PROVIDER_URL as string;
const TOKEN = process.env.NFT_STORAGE_TOKEN as string;

const mintNFT = async (fileName: string, image: Blob): Promise<DefaultResponse> => {
	try {
		const owner = new ethers.Wallet(WALLET_PK);
		const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			FactoryArtifact.abi,
			provider
		);
		const client = new NFTStorage({ token: TOKEN });
		const metadata = await client.store({
			name: "Talent Protocol NFT",
			description:
				"Talent Protocol NFT. Owners of this NFT are considered cool",
			image,
			properties: {
				type: "image",
				traits: fileName,
			},
		});
		//await contract.connect(owner).setTokenURI(tokenId, metadata.url);
		/*
		const mintResp = await NFTService.mintNFFT(
			"0x6d1003099CB2cBaBc5e25e0F738A19B37B111C97",
			fileName,
			image
		);
		*/
		return Promise.resolve({
			status: 200,
			message: "successfully setted nft metadata"
		});
	} catch (error) {
		console.log("error - ", error);
		return Promise.reject({
			status: 200,
			message: "error",
			error
		});
	}
};

export default {
	mintNFT,
};
