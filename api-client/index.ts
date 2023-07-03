import axios from "axios";

// todo: type this
interface Options {
	[key: string]: number | string;
}

const TALENT_API = "https://api.talentprotocol.com/api/v1";

export const createNFT = (
	options: Options,
	signature: string,
	userAddress: string,
	tokenId: number,
	code?: string
) =>
	axios.post("/api/nft", {
		properties: {
			...options,
		},
		signature,
		userAddress,
		tokenId,
		code,
	});

export const completeCreateTalentMateQuest = async (userWallet: string) =>
	await axios.put(
		`${TALENT_API}/quests/create_talent_mate/complete`,
		{
			id: userWallet,
		}
	);
