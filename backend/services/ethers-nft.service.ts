import { ethers } from "ethers";
import FactoryArtifact from "./contractJSON/talentNFT.json";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const NETWORK_URL = process.env.PROVIDER_URL as string;
const TOKEN = process.env.NFT_STORAGE_TOKEN as string;

const mintNFT = async () => {
	try {
		const owner = new ethers.Wallet(WALLET_PK);
		const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
		// @ts-ignore
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			FactoryArtifact.abi,
			provider
		);
		// await contract.isWhitelisted(owner.address);
	} catch (e) {
		console.log("error - ", e);
	}

	return {
		status: 200,
		message: "Test",
	};
};

export default {
	mintNFT,
};
