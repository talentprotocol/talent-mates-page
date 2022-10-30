import { NextApiRequest } from "next";
import MintTokenService from "backend/services/mint-token.service";
import { DefaultResponse } from "backend/types/response";

interface ControllerInterface {
	POST: (A: NextApiRequest) => Promise<DefaultResponse>;
}

const POST = async (req: NextApiRequest): Promise<DefaultResponse> => {
	try {
		return MintTokenService.createMintToken(req.body.userWallet);
	} catch (error) {
		console.info("error happened while handling POST /api/mint-token");
		console.error(error);
		return Promise.resolve({
			status: 500,
			message: "Internal server error",
		});
	}
};

const MintTokenController: ControllerInterface = {
	POST,
};

export default MintTokenController;
