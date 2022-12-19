export const MINT_ERROR_CODES = {
	COMBINATION_TAKEN: "COMBINATION_TAKEN",
	ACCOUNT_IN_BLACKLIST: "ACCOUNT_IN_BLACKLIST",
	USER_ALREADY_OWNS_NFT: "USER_ALREADY_OWNS_NFT",
	MESSAGE_NOT_SIGNED: "MESSAGE_NOT_SIGNED",
	NO_METAMASK: "NO_METAMASK",
};

export const MINT_ERROR_CODES_TO_MESSAGES = {
	COMBINATION_TAKEN:
		"This combination is already in use. Talent Mates are all unique combinations",
	ACCOUNT_IN_BLACKLIST:
		"This wallet does not have access to mint a Talent Mate.",
	USER_ALREADY_OWNS_NFT:
		"We're only allowing each wallet to mint a single Talent Mate.",
	MESSAGE_NOT_SIGNED:
		"You must sign the message in order to update the look of your Talent Mate.",
	NO_METAMASK:
		"You need to use the metamask mobile browser or use a browser that uses a metamask extension."
};
