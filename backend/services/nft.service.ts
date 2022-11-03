import sharp from "sharp";
import fs from "fs";
import mime from "mime";
import { File } from "nft.storage";
import { DefaultResponse } from "backend/types/response";
import NFTRepository from "backend/repositories/nft.repository";

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

type NFTProps = {
	[key in NFTPropsKeys]?: number;
};

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
	mintingToken: string,
	userAddress: string,
	tokenId: number
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
	const fileName = computeImageName(properties);
	const filePath = `${__dirname}/temp-output/${fileName}`;
	const parsedProperties = { ...properties };
	delete parsedProperties.gender;
	const traitList = Object.values(parsedProperties);
	const traitKeysList = Object.keys(parsedProperties);
	const imageList: string[] = traitList.map((el, index) =>
		getImagePath(
			traitKeysList[index],
			el,
			// @ts-ignore
			properties.gender
		)
	);
	traitList.shift();
	const sharpImage = sharp(imageList[0]);
	imageList.shift();
	try {
		await sharpImage
			.composite(imageList.map((el) => ({ input: el })))
			.toFile(filePath);
		const image = await createBlobFromPath(filePath);
		await NFTRepository.mintNFT(
			fileName,
			image,
			mintingToken,
			userAddress,
			tokenId
		);
		fs.unlink(filePath, (error) => {
			if (error) {
				console.error(`error deleting uploaded ipfs file: ${filePath}`, error);
			} else {
				console.info(`successfully deleted ${filePath}`);
			}
		});
		return Promise.resolve({
			status: 200,
			message: "NFT successfully created",
		});
	} catch (error) {
		return Promise.reject({
			status: 500,
			message: "Internal server error",
			error,
		});
	}
};

const NFTService = {
	createNFT,
};

export default NFTService;
