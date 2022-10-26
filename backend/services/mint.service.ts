import abi from "./contractJSON/talentNFT.json";
import { ethers } from "ethers";
import { NFTStorage } from "nft.storage";
import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";

const WALLET_PK = process.env.WALLET_PK as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
const PROVIDER_URL = process.env.PROVIDER_URL as string;
const TOKEN = process.env.NFT_STORAGE_TOKEN as string;

const mintNFFT = async (wallet_id: string, combination: string, image: Blob) => {
	try {
		const provider = new CeloProvider(PROVIDER_URL);
		const owner = new CeloWallet(WALLET_PK, provider);
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			// @ts-ignore
			abi.abi,
			provider
		);

		if (wallet_id.length > 0) {
			const balance = await contract.balanceOf(wallet_id);
			if (balance > 0) {
                const tokenId = await contract.tokenOfOwnerByIndex(wallet_id, 0);
				return {
					statusCode: 400,
					body: {
						errorId: 2,
						error: "User already has the NFT",
						tokenId: tokenId.toString(),
						tokenAddress: CONTRACT_ADDRESS,
					},
				};
			}
            
            const tx = await contract.connect(wallet_id).mint(combination);
            const receipt = await tx.wait();
            // @ts-ignore
            const transferEvent = receipt.events?.find((e) => {
                return e.event === "Transfer";
            });

            const tokenId = transferEvent.args.tokenId.toNumber();

            const client = new NFTStorage({ token: TOKEN });
            const metadata = await client.store({
                name: "Talent Protocol NFT",
                description:
                    "Talent Protocol NFT. Owners of this NFT are considered cool",
                image,
                properties: {
                    type: "image",
                    traits: combination,
                },
            });
			await contract.connect(owner).setTokenURI(tokenId, metadata.url);
			return {
				statusCode: 200,
				body: {
					tokenId: tokenId,
					tokenAddress: CONTRACT_ADDRESS,
				},
			};
		} else {
			return {
				statusCode: 400,
				body: { errorId: 1, error: "No wallet id provided" },
			};
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: { error: error },
		};
	}
};

export default {
	mintNFFT,
};
