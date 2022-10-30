import { DefaultResponse } from "backend/types/response";
import MintTokenRepository from "backend/repositories/mint-token.repository";

const createMintToken = (userWallet: string): Promise<DefaultResponse> => {
	return MintTokenRepository.createMintToken(userWallet);
};

const MintTokenService = {
	createMintToken,
};

export default MintTokenService;
