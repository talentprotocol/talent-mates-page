import { NextRequest } from "next/server";
import NFTService from "backend/services/nft.service";

const handlePostRequest = (req: NextRequest) => {
	console.info("creating nft");
	// @ts-ignore
	return NFTService.createNFT(req.body.properties || {});
};

export default {
	POST: handlePostRequest,
};
