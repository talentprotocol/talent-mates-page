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
const MANDATORY_PROPERTIES_LIST = ["gender", "body"];

const createNFT = (properties: NFTProps) => {
    // @ts-ignore
    if (MANDATORY_PROPERTIES_LIST.some(prop => properties[prop] === undefined)) {
        console.error("bad request format");
        return {
            status: 400,
            message: "Missing some NFT properties",
            requiredProperties: MANDATORY_PROPERTIES_LIST
        }
    }
    const parsedProperties = {...properties};
    // @ts-ignore
    delete parsedProperties.gender;
    const traitList = Object.values(parsedProperties);
    const traitKeysList = Object.keys(parsedProperties);
    const imageList: string[] = 
        // @ts-ignore
        traitList.map((el, index) => getTraitImagePath(traitKeysList[index], el, properties.gender));
    traitList.shift();
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