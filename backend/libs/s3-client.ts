import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
export const REGION = "eu-west-2"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
	credentials: {
		accessKeyId: "AKIAUTLBVWPOUEPEUJXG",
		secretAccessKey: "A0tb1NqWu+ckrfTlHmdUv1qmJe7W21kHnmVIzWf4",
	},
	region: REGION,
});
export { s3Client };
