import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, REGION } from "../libs/s3-client";

export const BUCKET = "talentprotocol-mintingpage-qa";

export const uploadFileToBucket = async (
	fileName: string,
	imageBuffer: Buffer
) => {
	const params = {
		Bucket: BUCKET,
		Key: fileName,
		Body: imageBuffer,
	};
	try {
		const results = await s3Client.send(new PutObjectCommand(params));
		console.log(
			"Successfully created " +
				params.Key +
				" and uploaded it to " +
				params.Bucket +
				"/" +
				params.Key
		);
		return {
			...results,
			baseURL: `https://${params.Bucket}.s3.${REGION}.amazonaws.com/`,
		};
	} catch (err) {
		console.log("Error", err);
		return {};
	}
};

export const uploadFileToIPFS = async () => {};
