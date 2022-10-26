import type { NextApiRequest, NextApiResponse } from "next";
import NFTController from "backend/controllers/nft.controller";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// @ts-ignore
	if (!NFTController[req.method]) {
		res.status(404).json({ message: "Not found" });
	}
	// @ts-ignore
	const response = await NFTController[req.method](req);
	res.status(response.status).json(response);
}
