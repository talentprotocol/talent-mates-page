import type { NextApiRequest, NextApiResponse } from "next";
import NFTController from "backend/controllers/nft.controller";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(404).json({ message: "Not found" });
	}
	const response = await NFTController.POST(req);
	res.status(response.status).json(response);
}
