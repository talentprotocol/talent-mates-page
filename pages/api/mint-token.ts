import type { NextApiRequest, NextApiResponse } from "next";
import MintTokenController from "backend/controllers/mint-token.controller";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(404).json({ message: "Not found" });
	}
	const response = await MintTokenController.POST(req);
	res.status(response.status).json(response);
}
