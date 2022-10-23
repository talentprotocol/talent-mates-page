const handleGetRequest = () => {
	return {
		status: 200,
		message: [],
	};
};

const handlePostRequest = () => {
	return {
		status: 200,
		message: "NFT created successfully",
	};
};

export default {
	GET: handleGetRequest,
	POST: handlePostRequest,
};
