import axios from "axios";

// todo: type this
interface Options {
    [key: string]: number | string
}

export const createNFT = (options: Options, signature: string, userAddress: string, tokenId: number) => 
    axios.post("/api/nft", {
        properties: {
            ...options
        },
        signature,
        userAddress,
        tokenId
    });