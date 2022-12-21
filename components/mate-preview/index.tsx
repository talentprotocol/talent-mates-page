import { useEffect, useMemo, useState } from "react";
import { Spinner, Typography, Button } from "shared-ui";
import { PREVIEW_STATE, Props } from "./types";
import {
	Container,
	ErrorMessage,
	Preview,
	TextArea,
	DescriptionArea,
	Description,
	StyledButton,
	LimitedText,
	ButtonArea,
	ErrorContainer,
	TraitArea,
	TraitBox,
} from "./styled";
import { ethers } from "ethers";
import abi from "../nft-picker/talentNFT.json";
import { ContractBook } from "libs/contract-book";
import { Footer } from "components/footer";

ContractBook.new = {
	name: "TalentNFT",
	abi: abi.abi,
	address: "0x41033160a2351358ddc1B97eDd0bc6f00CdEca92",
	network: "https://polygon-rpc.com/",
	chainId: "137",
};

export const ipfsToURL = (ipfsAddress: string) => {
	if (ipfsAddress.includes("http")) {
		return ipfsAddress;
	}
	return "https://ipfs.io/" + ipfsAddress.replace("://", "/");
};

const get = (url: string, params = {}) => {
	return fetch(url).then((response) => {
		// @ts-ignore
		if (params.ignoreJSON) {
			return response;
		}
		return response.json();
	});
};


const provider = new ethers.providers.JsonRpcProvider(
	"https://polygon-rpc.com/"
);
const contract = new ethers.Contract(
	ContractBook["TalentNFT"].address,
	ContractBook["TalentNFT"].abi,
	provider
);

export const MatePreview = ({ id, imageURL }: Props) => {
	const [state, setState] = useState(PREVIEW_STATE.FIRST_LOAD);
	const [NFTAttributes, setNFTAttributes] = useState([]);
	const [NFTData, setNFTData] = useState({
		imageUrl: "",
		tokenId: "",
		owner: "",
	});

	useEffect(() => {
		if (!id) return;
		(async () => {
			try {
				const metadataURI = await contract.tokenURI(Number(id));
				const result = await get(ipfsToURL(metadataURI));
				setNFTAttributes(result.attributes);
			} catch {}
		})();
	}, [id]);

	const checkForNFT = async () => {

		const owner = await contract.ownerOf(id);

		const imageUrl = async (): Promise<string> => {
			if (!imageURL) {
				const metadataURI = await contract.tokenURI(id);
				const result = await get(ipfsToURL(metadataURI));
				return ipfsToURL(result.image);
			} else {
				return imageURL;
			}
		};

		setNFTData({
			imageUrl: await imageUrl(),
			tokenId: id || "",
			owner,
		});

		return Promise.resolve();
	};

	useEffect(() => {
		if (state === PREVIEW_STATE.FIRST_LOAD || id === undefined) {
			setState(PREVIEW_STATE.LOADING);
			return;
		}
		if (!id) {
			setState(PREVIEW_STATE.ERROR);
		} else {
			checkForNFT()
				.then(() => setState(PREVIEW_STATE.FOUND))
				.catch(() => setState(PREVIEW_STATE.ERROR));
		}
	}, [id, state]);

	const shortenAddress = (address: string): string => {
		return `${address.substring(0, 5)}...${address.substring(
			address.length - 4,
			address.length
		)}`;
	};

	const downloadImage = async () => {
		const image = await fetch(NFTData.imageUrl);
		const imageBlog = await image.blob();
		const imageURL = URL.createObjectURL(imageBlog);

		const link = document.createElement("a");
		link.href = imageURL;
		link.download = `${NFTData.tokenId}.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const content = useMemo(() => {
		switch (state) {
			case PREVIEW_STATE.FIRST_LOAD:
			case PREVIEW_STATE.LOADING:
				return (
					<>
						<ErrorContainer>
							<Spinner isShown noBox />
						</ErrorContainer>
						<Footer fixed />
					</>
				);
			case PREVIEW_STATE.ERROR:
				return (
					<>
						<ErrorContainer>
							<ErrorMessage>Mate not found</ErrorMessage>
						</ErrorContainer>
						<Footer fixed />
					</>
				);
			case PREVIEW_STATE.FOUND:
			default:
				return (
					<>
						<Preview>
							<img src={imageURL || NFTData.imageUrl} />
						</Preview>
						<TextArea>
							<Typography
								type="h3"
								text="Boom shakalak! Meet your new MATE!"
								color="DARK_BLUE"
							/>
							<Typography
								type="body1"
								text={`Talent Protocol Mate #${NFTData.tokenId}`}
								color="NOT_SO_LIGHT_GREY"
							/>
							<LimitedText>
								<Typography type="body3" color="NOT_SO_LIGHT_GREY">
									<>
										Talent Mates come from a faraway planet, where everyone can
										find fulfilling work.
										<br />
										Talent Mates is a customizable NFT collection, exclusive to
										the Talent Protocol community. Holding one Talent Mate will
										give you an all-access pass to new features, exclusive swag,
										and scholarships. Minting is free on Polygon (except for
										gas) for all verified Talent Protocol users.
									</>
								</Typography>
							</LimitedText>
								{!!NFTAttributes.length && (
									<TraitArea>
										{NFTAttributes.map(el => (
											<TraitBox key={el["trait_type"]}>
												<span>{el["trait_type"]}</span>
												<span>{el["value"]}</span>
											</TraitBox>
										))}
									</TraitArea>
								)}
							<DescriptionArea>
								<Description>
									<Typography
										type="body2"
										text="Owned by"
										color="NOT_SO_LIGHT_GREY"
									/>
									<Typography
										type="body2"
										text={shortenAddress(NFTData.owner)}
										color="LIGHT_PURPLE"
									/>
								</Description>
								<Description>
									<Typography
										type="body2"
										text="Contract Address"
										color="NOT_SO_LIGHT_GREY"
									/>
									<Typography
										type="body2"
										text={shortenAddress(ContractBook["TalentNFT"].address)}
										color="LIGHT_PURPLE"
									/>
								</Description>
								<Description>
									<Typography
										type="body2"
										text="Token ID"
										color="NOT_SO_LIGHT_GREY"
									/>
									<Typography
										type="body2"
										text={NFTData.tokenId}
										color="BLACK"
									/>
								</Description>
							</DescriptionArea>
							<ButtonArea>
								<Button
									type="button"
									variant="primary"
									onClick={downloadImage}
									text="Download for sharing"
								/>
								<StyledButton
									type="link"
									variant="secondary"
									href="https://opensea.io/collection/talentprotocol"
									text="View on Opensea"
									target="_blank"
								/>
							</ButtonArea>
						</TextArea>
						<Footer fixed />
					</>
				);
		}
	}, [state, NFTData, NFTAttributes]);

	return <Container>{content}</Container>;
};
