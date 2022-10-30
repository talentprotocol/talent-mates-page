import { ethers } from "ethers";
import FactoryArtifact from "./contracts/talentNFT.json";
import { DefaultResponse } from "backend/types/response";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const NETWORK_URL = process.env.PROVIDER_URL as string;

const createMintToken = async (userWallet: string): Promise<DefaultResponse> => {
	try {
		const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
		const owner = new ethers.Wallet(WALLET_PK, provider);
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			FactoryArtifact.abi,
			provider
		);
		const token = await contract.connect(owner).createMintingToken(userWallet);
		return Promise.resolve({
			status: 200,
			message: "successfully setted nft metadata",
			token: token.data
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
	createMintToken,
};
