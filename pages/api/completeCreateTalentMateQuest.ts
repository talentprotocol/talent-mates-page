import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const TALENT_API = "https://api.talentprotocol.com/api/v1";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "PUT") {
		res.status(404).json({ message: "Not found" });
	}

	const response = await axios.put(
		`${TALENT_API}/quests/create_talent_mate/complete`,
		{
			id: req.body.id,
		}
	);
	res.status(response.status).json(response);
}
