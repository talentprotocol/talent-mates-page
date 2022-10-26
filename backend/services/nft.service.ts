import sharp from "sharp";
import { uploadFileToBucket } from "backend/repositories/nft.repository";

export interface NFTProps {
	gender: "male" | "female";
	background: number;
	body: number;
	eyes: number;
	mouth: number;
	hair: number;
	clothing: number;
	accessories: number;
	thinking: number;
}

const PROPERTIES_LIST = [
	"gender",
	"background",
	"body",
	"eyes",
	"mouth",
	"hair",
	"clothing",
	"accessories",
	"thinking",
];
const MANDATORY_PROPERTIES_LIST = ["gender", "body"];

const getTraitImagePath = (
	traitName: string,
	index: number,
	gender: "male" | "female"
) => {
	const imageName = index < 10 ? `0${index}.png` : `${index}.png`;
	return `${__dirname}/trait-assets/${traitName}/${gender}/${imageName}`;
};

const computeImage = (properties: Record<string, number | string>) => {
	let nameAsArray = PROPERTIES_LIST.map((el) =>
		properties[el] ? `${properties[el]}-` : "x-"
	);
	nameAsArray = nameAsArray.join("").split("");
	nameAsArray.pop();
	return nameAsArray.join("") + ".png";
};

const createNFT = async (properties: NFTProps) => {
	if (
		// @ts-ignore
		MANDATORY_PROPERTIES_LIST.some((prop) => properties[prop] === undefined)
	) {
		console.error("bad request format");
		return {
			status: 400,
			message: "Missing some NFT properties",
			requiredProperties: MANDATORY_PROPERTIES_LIST,
		};
	}
	// @ts-ignore
	const fileName = computeImage(properties);
	const parsedProperties = { ...properties };
	// @ts-ignore
	delete parsedProperties.gender;
	const traitList = Object.values(parsedProperties);
	const traitKeysList = Object.keys(parsedProperties);
	const imageList: string[] = traitList.map((el, index) =>
		// @ts-ignore
		getTraitImagePath(traitKeysList[index], el, properties.gender)
	);
	traitList.shift();
	console.info("creating new nft");
	const sharpImage = sharp(imageList[0]);
	imageList.shift();
	try {
		const imageBuffer = await sharpImage
			.composite(imageList.map((el) => ({ input: el })))
			.toBuffer();
		const results = await uploadFileToBucket(fileName, imageBuffer);
		console.info("nft created successfully");
		return {
			status: 200,
			message: "NFT created successfully",
			// @ts-ignore
			result: `${results.baseURL}${fileName}`,
			// @ts-ignore
			traitStack: PROPERTIES_LIST.map((prop) => properties[prop]),
		};
	} catch (err) {
		console.error("Error generating NFT", err);
		return {
			status: 500,
			message: "Error generating NFT",
			// @ts-ignore
			traitStack: PROPERTIES_LIST.map((prop) => properties[prop]),
		};
	}
};

export default {
	createNFT,
};
