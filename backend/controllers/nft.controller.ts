import { NextRequest } from "next/server";
import NFTService from "backend/services/nft.service";

const handlePostRequest = async (req: NextRequest) => {
	console.info("creating nft");
	// @ts-ignore
	return await NFTService.createNFT(req.body.properties || {});
};

export default {
	POST: handlePostRequest,
};
