export const MINT_ERROR_CODES = {
	COMBINATION_TAKEN: "COMBINATION_TAKEN",
	ACCOUNT_IN_BLACKLIST: "ACCOUNT_IN_BLACKLIST",
	USER_ALREADY_OWNS_NFT: "USER_ALREADY_OWNS_NFT",
	MESSAGE_NOT_SIGNED: "MESSAGE_NOT_SIGNED",
	NO_METAMASK: "NO_METAMASK",
	WRONG_NETWORK: "WRONG_NETWORK",
	EVENT_NOT_FOUND: "EVENT_NOT_FOUND",
};

export const MINT_ERROR_CODES_TO_MESSAGES = {
	COMBINATION_TAKEN:
		"This combination is already in use. Talent Mates are all unique combinations",
	ACCOUNT_IN_BLACKLIST:
		"You are not whitelisted. Make sure you have a Talent Protocol account that is verified and you're using the same wallet on both platforms.",
	USER_ALREADY_OWNS_NFT: "You can only mint one Talent Mate.",
	MESSAGE_NOT_SIGNED:
		"You must sign the message in order to update the look of your Talent Mate.",
	NO_METAMASK: "Add a metamask extension to your browser to continue",
	WRONG_NETWORK:
		"The network where you are trying to mint is not supported. Please use Polygon (chain id 137)",
	EVENT_NOT_FOUND:
		"We were not able to validate your transaction. Check your metamask to understand why and try again later",
};
