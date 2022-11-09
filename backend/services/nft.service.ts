import sharp from "sharp";

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
	"back_object",
	"skin",
	"ear",
	"hair",
	"outfit",
	"mouth",
	"eyes",
	"cloud",
];
const MANDATORY_PROPERTIES_LIST = ["gender", "skin", "background"];

const getTraitImagePath = (
	traitName: string,
	index: number,
	gender: "male" | "female"
) => {
	const imageName = index < 10 ? `0${index}.png` : `${index}.png`;
	console.log("HERHE");
	console.log(__dirname);
	return `${__dirname}/trait-assets/${gender}/${traitName}/${imageName}`;
};

const computeImage = (properties: Record<string, number | string>) => {
	let nameAsArray = PROPERTIES_LIST.map((el) =>
		properties[el] ? `${properties[el]}-` : "x-"
	);
	nameAsArray = nameAsArray.join("").split("");
	nameAsArray.pop();
	return nameAsArray.join("") + ".png";
};

const createNFT = (properties: NFTProps) => {
	// @ts-ignore
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
	const parsedProperties = { ...properties };
	// @ts-ignore
	delete parsedProperties.gender;
	const traitList = Object.values(parsedProperties);
	const traitKeysList = Object.keys(parsedProperties);
	const imageList: string[] =
		// @ts-ignore
		traitList.map((el, index) =>
			getTraitImagePath(traitKeysList[index], el as number, properties.gender)
		);
	traitList.shift();
	console.info("creating new nft");
	const sharpImage = sharp(imageList[0]);
	imageList.shift();
	sharpImage
		.composite(imageList.map((el) => ({ input: el })))
		// @ts-ignore
		.toFile(computeImage(properties));
	// DECIDE PATH FROM HERE ...
	console.info("nft created successfully");
	return {
		status: 200,
		message: "NFT created successfully",
		// @ts-ignore
		traitStack: PROPERTIES_LIST.map((prop) => properties[prop]),
	};
};

export default {
	createNFT,
};
