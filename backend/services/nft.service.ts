import sharp from "sharp";

export interface NFTProps {
    gender: "male" | "female",
    background: number,
    body: number,
    eyes: number,
    mouth: number,
    hair: number,
    clothing: number,
    accessories: number,
    thinking: number
}

const PROPERTIES_LIST = ["gender", "background", "body", "eyes", "mouth", "hair", "clothing", "accessories", "thinking"];

const createNFT = (properties: NFTProps) => {
    // @ts-ignore
    if (PROPERTIES_LIST.some(prop => properties[prop] === undefined)) {
        console.error("bad request format");
        return {
            status: 400,
            message: "Missing some NFT properties",
            requiredProperties: PROPERTIES_LIST
        }
    }
    const imageList: string[] = [];
    const traitList = [...Object.values(properties)];
    traitList.shift();
    traitList.forEach((el, index) => {
        imageList.push(getTraitImagePath(PROPERTIES_LIST[index + 1], el, properties.gender))
    });
    console.info("creating new nft");
    const sharpImage = sharp(imageList[0]);
    imageList.shift();
    sharpImage
        .composite(imageList.map(el => ({input: el})))
        .toFile('./output.png');
    // DECIDE PATH FROM HERE ...
    console.info("nft created successfully");
    return {
        status: 200,
        message: "NFT created successfully",
        // @ts-ignore
        traitStack: PROPERTIES_LIST.map(prop => properties[prop])
    }
}

const getTraitImagePath = (traitName: string, index: number, gender: "male" | "female") => {
    const imageName = index < 10 ? `0${index}.png` : `${index}.png`;
    return `${__dirname}/trait-assets/${traitName}/${gender}/${imageName}`;
}

export default {
    createNFT
}