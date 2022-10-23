import type { NextApiRequest, NextApiResponse } from "next";
import NFTController from "backend/controllers/nft";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// @ts-ignore
	if (!NFTController[req.method]) {
		res.status(404).json({ message: "Not found" });
	}
	// @ts-ignore
	const response = NFTController[req.method]();
	res.status(response.status).json(response.message);
}
