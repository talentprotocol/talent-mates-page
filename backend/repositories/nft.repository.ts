import { ethers } from "ethers";
import FactoryArtifact from "./contracts/talentNFT.json";
import { DefaultResponse } from "backend/types/response";
import { NFTStorage } from "nft.storage";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const NETWORK_URL = process.env.PROVIDER_URL as string;
const TOKEN = process.env.NFT_STORAGE_TOKEN as string;

const mintNFT = async (fileName: string, image: Blob, mintingToken: string, account: string, tokenId: number): Promise<DefaultResponse> => {
	try {
		const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
		const owner = new ethers.Wallet(WALLET_PK, provider);
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			FactoryArtifact.abi,
			provider
		);
		const isMintingTokenValid = contract.connect(owner).validateMintingToken(mintingToken, account);
		if (isMintingTokenValid) {
			return Promise.reject({
				status: 500,
				message: "minting token is invalid"
			});
		}
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
		await contract.connect(owner).setTokenURI(tokenId, metadata.url, mintingToken, account);
		return Promise.resolve({
			status: 200,
			message: "successfully setted nft metadata"
		});
	} catch (error) {
		console.log("error - ", error);
		return Promise.reject({
			status: 500,
			message: "error",
			error
		});
	}
};

export default {
	mintNFT,
};
