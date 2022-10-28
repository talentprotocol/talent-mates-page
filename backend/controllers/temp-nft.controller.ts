import { NextRequest } from "next/server";
import NFTService from "backend/services/temp-nft.service";
import EthersNFTService from "backend/services/ethers-nft.service";

const handlePostRequest = async (req: NextRequest) => {
	return await EthersNFTService.mintNFT();
	console.info("creating nft");
	// @ts-ignore
	return await NFTService.createNFT(req.body.properties || {});
};

export default {
	POST: handlePostRequest,
};
