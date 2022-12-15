import sharp from "sharp";
import fs from "fs";
import mime from "mime";
import axios from "axios";
import { File } from "nft.storage";
import { DefaultResponse } from "backend/types/response";
import NFTRepository from "backend/repositories/nft.repository";
import { ethers } from "ethers";

type NFTPropsKeys =
	| "gender"
	| "background"
	| "body"
	| "eyes"
	| "mouth"
	| "hair"
	| "clothing"
	| "accessories"
	| "thinking";

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
	"background-object": number;
}

const AUTH_SIGNED_MESSAGE = "I'm signing this message";
const PROPERTIES_LIST = [
	"gender",
	"background",
	"background-object",
	"body",
	"hair",
	"clothing",
	"mouth",
	"eyes",
	"thinking",
];

const MANDATORY_PROPERTIES_LIST = ["gender", "body", "background", "mouth"];

const createBlobFromPath = async (filePath: string) => {
	const content = await fs.promises.readFile(filePath);
	const type = mime.getType(filePath);
	return new File([content], filePath.substring(5, filePath.length), {
		type: type as string,
	});
};

const getImagePath = (
	traitName: string,
	index: number,
	gender: "male" | "female"
) => {
	const imageName = index < 10 ? `0${index}.png` : `${index}.png`;
	return `${__dirname}/trait-assets/${traitName}/${gender}/${imageName}`;
};

let imageStorage = {};

const getImageFromURL = async (
	traitName: string,
	index: number,
	gender: "male" | "female"
) => {
	const imageName = index < 10 ? `0${index}.png` : `${index}.png`;
	// @ts-ignore
	if(!imageStorage?.[traitName]?.[gender]?.[imageName]) {
		const url = `https://d2hlxeotl5sfi8.cloudfront.net/${traitName}/${gender}/${imageName}`;
		const image = (await axios({ url, responseType: "arraybuffer" })).data as Buffer;
		// @ts-ignore
		if (!imageStorage[traitName]) {
			// @ts-ignore
			imageStorage[traitName] = {}
		}
		// @ts-ignore
		if (!imageStorage[traitName][gender]) {
			// @ts-ignore
			imageStorage[traitName][gender] = {}
		}
		// @ts-ignore
		imageStorage[traitName][gender][imageName] = image;
	}

	// @ts-ignore
	return imageStorage[traitName][gender][imageName];
}

const computeImageName = (properties: Record<string, number | string>) => {
	let nameAsArray = PROPERTIES_LIST.map((el) =>
		properties[el] ? `${properties[el]}-` : "x-"
	);
	nameAsArray = nameAsArray.join("").split("");
	nameAsArray.pop();
	return nameAsArray.join("") + ".png";
};

const createNFT = async (
	properties: NFTProps,
	userAddress: string,
	tokenId: number,
	signature: string
): Promise<DefaultResponse> => {
	if (
		MANDATORY_PROPERTIES_LIST.some(
			(prop) => properties[prop as NFTPropsKeys] === undefined
		)
	) {
		return {
			status: 400,
			message: "Missing some NFT properties",
			requiredProperties: MANDATORY_PROPERTIES_LIST,
		};
	}
	const signedMessageAddress = ethers.utils
		.verifyMessage(AUTH_SIGNED_MESSAGE, signature)
		.toLocaleLowerCase();
	if (signedMessageAddress !== userAddress) {
		return {
			status: 401,
			message: "Invalid signature",
		};
	}
	// @ts-ignore
	const fileName = computeImageName(properties);
	const filePath = `${__dirname}/temp-output/${fileName}`;
	const parsedProperties = { ...properties };
	// @ts-ignore
	delete parsedProperties.gender;
	const traitList = Object.values(parsedProperties);
	const traitKeysList = Object.keys(parsedProperties);
	const imagePromises: Promise<any>[] = traitList.map((el, index) =>
		getImageFromURL(
			traitKeysList[index],
			// @ts-ignore
			el,
			properties.gender
		)
	)
	let imageList: any[] = [];

	imageList = await Promise.all(imagePromises);

	// const imageList: string[] = traitList.map((el, index) =>
	// 	getImageFromURL(
	// 		traitKeysList[index],
	// 		// @ts-ignore
	// 		el,
	// 		properties.gender
	// 	)
	// )

	console.log(imageList);
	traitList.shift();
	const sharpImage = sharp(imageList[0]);
	imageList.shift();
	try {
		await sharpImage
			.composite(
				imageList.map((el) => {
					console.log(el);
					return { input: el };
				})
			)
			.toFile(filePath);
		const image = await createBlobFromPath(filePath);
		await NFTRepository.setMetaData(fileName, image, tokenId, properties, signedMessageAddress);
		fs.unlink(filePath, (error) => {
			if (error) {
				console.error(`error deleting uploaded ipfs file: ${filePath}`, error);
			} else {
				console.info(`successfully deleted ${filePath}`);
			}
		});
		return {
			status: 200,
			message: "NFT successfully created",
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			message: "Internal server error",
			error,
		};
	}
};

const NFTService = {
	createNFT,
};

export default NFTService;
