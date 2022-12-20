import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { debounce } from "lodash";
import { Button, Spinner } from "shared-ui";
import {
	PickerArea,
	TraitPickerArea,
	DisplayArea,
	GenderPicker,
	ImageHolder,
	ActionArea,
	SectionContainer,
	TraitPickerAreaMobile,
} from "./styled";
import abi from "./talentNFT.json";
import { useTrait } from "./hooks/use-trait";
import { Trait } from "./trait";
import { ShuffleButton } from "./suffle-button";
import { Props } from "./types";
import { ethers } from "ethers";
import { MINT_ERROR_CODES, MINT_ERROR_CODES_TO_MESSAGES } from "./error-codes";
import { createNFT } from "api-client";
import { ContractBook } from "libs/contract-book";

ContractBook.new = {
	name: "TalentNFT",
	abi: abi.abi,
	address: "0x529872baCcfeeA84d43Cea2f0c4b3C38bBA45ce1",
	network: "https://polygon-rpc.com/",
	chainId: "137",
};

const AUTH_SIGNED_MESSAGE =
	"Sign this message for us to guarantee that you are the owner of the NFT and can change it's metadata.";
const CANVAS_SIDE = 569;
const BASE_URI =
	"ipfs://bafyreifuc7inyu6fhytj2vof6qhrejkla7ohd7qwac33gfwcc57mrbxfn4/metadata.json";

export const NFTPicker = ({
	openModal,
	openInstructionModal,
	closeInstructionModal,
	jumpToNextMintState,
	skipNextMintState,
	closeModal,
	setImageSource,
	openErrorModal,
}: Props) => {
	const [accountTier, setAccountTier] = useState(0);
	const [hasJumpedToUnlockedSkin, setHasJumpedToUnlockedSkin] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [gender, setGender] = useState<"male" | "female">("male");
	const [generatingImage, setGeneratingImage] = useState(true);
	useEffect(() => {
		(async () => {
			// @ts-ignore
			const { ethereum } = window;
			if (!ethereum || !ethereum.isMetaMask) {
				setAccountTier(1);
				return;
			}
			const defaultProvider = new ethers.providers.Web3Provider(ethereum);
			const accounts = await defaultProvider.send("eth_requestAccounts", []);

			const chainHex = ethers.utils.hexValue(ethers.utils.hexlify(137));
			await defaultProvider.send("wallet_switchEthereumChain", [
				{ chainId: chainHex },
			]);

			if (accounts.length == 0) {
				setAccountTier(1);
				openInstructionModal();
			}
			// @ts-ignore
			const provider = new ethers.providers.JsonRpcProvider(
				ContractBook["TalentNFT"].network
			);
			const contract = new ethers.Contract(
				ContractBook["TalentNFT"].address,
				ContractBook["TalentNFT"].abi,
				provider
			);
			if (typeof window !== undefined) {
				// @ts-ignore
				const url = new URL(document.location);
				const code = url.searchParams.get("code") || "";
				const accountTier = await contract.checkAccountOrCodeTier(
					accounts[0],
					code
				);
				// @ts-ignore
				window.accountTier = accountTier;

				try {
					const tokenIdOfUser = await contract.tokenOfOwnerByIndex(
						accounts[0],
						0
					);
					// @ts-ignore
					window.tokenIdOfUser = tokenIdOfUser.toNumber();
				} catch {
					// user does not have any minted token;
				}
				setAccountTier(accountTier);
				setHasJumpedToUnlockedSkin(false);
				openInstructionModal();
			}
		})();
	}, []);

	const getSkinLevel = () => {
		if (accountTier > 2) {
			return 3 + accountTier;
		} else {
			return 5;
		}
	};

	const traits = {
		backgroundTrait: useTrait({
			name: "background",
			description: "Background Colour",
			maxElements: { male: 12, female: 12 },
			gender,
		}),
		backgroundObjectTrait: useTrait({
			name: "background-object",
			description: "Background Object",
			maxElements: { male: 24, female: 24 },
			gender,
		}),
		skinTrait: useTrait({
			name: "body",
			description: "Skin",
			// Skins are ordered from 5 and above,
			// For each account tier level there is one more skin unlocked
			maxElements: { male: getSkinLevel(), female: getSkinLevel() },
			gender,
		}),
		clothingTrait: useTrait({
			name: "clothing",
			description: "Clothes",
			maxElements: { male: 27, female: 27 },
			gender,
		}),
		hairTrait: useTrait({
			name: "hair",
			description: "Head",
			maxElements: { male: 24, female: 24 },
			gender,
		}),
		mouthTrait: useTrait({
			name: "mouth",
			description: "Mouth",
			maxElements: { male: 14, female: 14 },
			gender,
		}),
		eyesTrait: useTrait({
			name: "eyes",
			description: "Eyes",
			maxElements: { male: 11, female: 12 },
			gender,
		}),
		thinkingTrait: useTrait({
			name: "thinking",
			description: "Thinking Cloud",
			maxElements: { male: 15, female: 15 },
			gender,
		}),
	};

	useEffect(() => {
		if (!hasJumpedToUnlockedSkin && traits.skinTrait.maxElements["male"] === getSkinLevel()) {
			setHasJumpedToUnlockedSkin(true);
			traits.skinTrait.updateCurrentSelection(10000, { amount: getSkinLevel() });
		}
	}, [traits.skinTrait, hasJumpedToUnlockedSkin]);

	const mintNFT = useCallback(async () => {
		const combination =
			Object.values(traits)
				.map((t) => t.currentSelection)
				.join("-") + ".png";
		// @ts-ignore
		if (!ethereum) {
			throw MINT_ERROR_CODES.NO_METAMASK;
		}
		// @ts-ignore
		const defaultProvider = new ethers.providers.Web3Provider(ethereum);
		const signer = defaultProvider.getSigner();
		const accounts = await defaultProvider.send("eth_requestAccounts", []);
		// @ts-ignore
		const provider = new ethers.providers.JsonRpcProvider(
			ContractBook["TalentNFT"].network
		);
		const contract = new ethers.Contract(
			ContractBook["TalentNFT"].address,
			ContractBook["TalentNFT"].abi,
			provider
		);

		const isAvailable = await contract.isCombinationAvailable(combination);
		if (!isAvailable) {
			throw MINT_ERROR_CODES.COMBINATION_TAKEN;
		}

		// @ts-ignore
		const url = new URL(document.location);
		const code = url.searchParams.get("code") || "";
		const isWhitelisted = await contract.isWhitelisted(accounts[0], code);
		if (!isWhitelisted) {
			throw MINT_ERROR_CODES.ACCOUNT_IN_BLACKLIST;
		}

		const userBalance = await contract.balanceOf(await signer.getAddress());
		let tokenId;
		if (userBalance > 0) {
			tokenId = await contract.tokenOfOwnerByIndex(accounts[0], 0);
			const tokenURI = await contract.tokenURI(tokenId);
			if (tokenURI == BASE_URI) {
				skipNextMintState();
			} else {
				throw MINT_ERROR_CODES.USER_ALREADY_OWNS_NFT;
			}
		} else {
			jumpToNextMintState();

			const content = await contract.connect(signer).mint(code);
			// @ts-ignore
			window.mintHash = content.hash;

			// clear code from URL now that it's been used
			window.history.pushState(
				{},
				document.location.href,
				document.location.href.replace(document.location.search, "")
			);

			const receipt = await content.wait();

			const event = receipt.events?.find((e: any) => {
				return e.event === "Transfer";
			});

			tokenId = event.args[2].toNumber();
			// @ts-ignore
			window.tokenIdOfUser = tokenId;
			jumpToNextMintState();
		}

		const options = Object.keys(traits).reduce((acc, t) => {
			// @ts-ignore
			if (traits[t].currentSelection !== -1) {
				// @ts-ignore
				acc[traits[t].name] = traits[t].currentSelection;
			}
			return acc;
		}, {});

		try {
			const signature = await signer.signMessage(AUTH_SIGNED_MESSAGE);
			// @ts-ignore
			options["gender"] = gender;
			// @ts-ignore

			await createNFT(options, signature, accounts[0], tokenId, code)
				.then(() => {
					if (typeof window !== "undefined" && canvasRef.current) {
						const url = canvasRef.current.toDataURL("image/png");
						setImageSource(url);
						jumpToNextMintState();
					}
				})
				.catch((err) => {
					closeModal();
					openErrorModal(err.toString());
				});
		} catch {
			throw MINT_ERROR_CODES.MESSAGE_NOT_SIGNED;
		}
	}, [
		traits.hairTrait,
		traits.backgroundTrait,
		traits.clothingTrait,
		traits.clothingTrait,
		traits.eyesTrait,
		traits.mouthTrait,
		traits.skinTrait,
		traits.thinkingTrait,
		traits.backgroundObjectTrait,
		gender,
	]);

	const openMintModal = useCallback(
		async (event: SyntheticEvent) => {
			openModal(event);
			try {
				// temp disable for "go-live"
				await mintNFT();
			} catch (err) {
				closeModal();
				// @ts-ignore
				if (MINT_ERROR_CODES[err]) {
					// @ts-ignore
					openErrorModal(MINT_ERROR_CODES_TO_MESSAGES[err]);
				} else {
					// @ts-ignore
					openErrorModal(err.toString());
				}
			}
		},
		[
			openModal,
			canvasRef.current,
			traits.hairTrait,
			traits.backgroundTrait,
			traits.clothingTrait,
			traits.clothingTrait,
			traits.eyesTrait,
			traits.mouthTrait,
			traits.skinTrait,
			traits.thinkingTrait,
			traits.backgroundObjectTrait,
		]
	);

	useEffect(
		debounce(() => {
			if (typeof window !== "undefined" && canvasRef.current) {
				setGeneratingImage(true);
				const canvasContext = canvasRef?.current.getContext("2d");
				canvasContext?.clearRect(0, 0, CANVAS_SIDE, CANVAS_SIDE);
				const promisesList: Promise<CanvasImageSource>[] = [];
				const traitList = Object.keys(traits);
				traitList.forEach((trait) => {
					// @ts-ignore
					if (traits[trait].currentSelection !== -1) {
						// @ts-ignore
						if (traits[trait].currentSelection !== -1) {
							const traitImage = new Image();
							traitImage.crossOrigin = "Anonymous";
							// @ts-ignore
							traitImage.src = traits[trait].image;
							const traitPromise = new Promise<HTMLImageElement>(
								(resolve, reject) => {
									traitImage.onload = () => {
										resolve(traitImage);
									};
									traitImage.onerror = () => {
										reject(null);
									};
								}
							);
							promisesList.push(traitPromise);
						}
					}
				});
				Promise.all(promisesList).then((images) => {
					images.forEach((image) => {
						canvasContext?.drawImage(image, 0, 0, CANVAS_SIDE, CANVAS_SIDE);
					});
					setGeneratingImage(false);
				});
			}
		}, 100),
		[
			traits.hairTrait,
			traits.backgroundTrait,
			traits.clothingTrait,
			traits.clothingTrait,
			traits.eyesTrait,
			traits.mouthTrait,
			traits.skinTrait,
			traits.thinkingTrait,
			traits.backgroundObjectTrait,
		]
	);

	const shuffleCombination = useCallback(() => {
		Object.values(traits).forEach((trait) => trait.shuffle());
	}, []);

	useEffect(() => {
		setTimeout(() => {
			shuffleCombination();
			setGeneratingImage(false);
		});
	}, []);

	return (
		<SectionContainer>
			<PickerArea>
				<TraitPickerArea>
					<Trait
						trait={traits.backgroundTrait.name}
						description={traits.backgroundTrait.description}
						onTraitSelection={traits.backgroundTrait.updateCurrentSelection}
						currentTraitNumber={traits.backgroundTrait.currentSelection}
						totalNumberOfTraits={traits.backgroundTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.skinTrait.name}
						description={traits.skinTrait.description}
						onTraitSelection={traits.skinTrait.updateCurrentSelection}
						currentTraitNumber={traits.skinTrait.currentSelection}
						totalNumberOfTraits={traits.skinTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.hairTrait.name}
						description={traits.hairTrait.description}
						onTraitSelection={traits.hairTrait.updateCurrentSelection}
						currentTraitNumber={traits.hairTrait.currentSelection}
						totalNumberOfTraits={traits.hairTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.clothingTrait.name}
						description={traits.clothingTrait.description}
						onTraitSelection={traits.clothingTrait.updateCurrentSelection}
						currentTraitNumber={traits.clothingTrait.currentSelection}
						totalNumberOfTraits={traits.clothingTrait.maxElements[gender]}
					/>
				</TraitPickerArea>
				<DisplayArea>
					<GenderPicker>
						<Button
							text="Body 1"
							type="button"
							variant={gender === "male" ? "quaternary" : "secondary"}
							fullWidth
							onClick={() => setGender("male")}
						/>
						<Button
							text="Body 2"
							type="button"
							variant={gender === "female" ? "quaternary" : "secondary"}
							fullWidth
							onClick={() => setGender("female")}
						/>
					</GenderPicker>
					<ImageHolder>
						<Spinner isShown={generatingImage} />
						<canvas
							style={{ overflow: "hidden" }}
							ref={canvasRef}
							width={`${CANVAS_SIDE}px`}
							height={`${CANVAS_SIDE}px`}
						/>
					</ImageHolder>
				</DisplayArea>
				<TraitPickerAreaMobile>
					<Trait
						trait={traits.backgroundTrait.name}
						description={traits.backgroundTrait.description}
						onTraitSelection={traits.backgroundTrait.updateCurrentSelection}
						currentTraitNumber={traits.backgroundTrait.currentSelection}
						totalNumberOfTraits={traits.backgroundTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.skinTrait.name}
						description={traits.skinTrait.description}
						onTraitSelection={traits.skinTrait.updateCurrentSelection}
						currentTraitNumber={traits.skinTrait.currentSelection}
						totalNumberOfTraits={traits.skinTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.hairTrait.name}
						description={traits.hairTrait.description}
						onTraitSelection={traits.hairTrait.updateCurrentSelection}
						currentTraitNumber={traits.hairTrait.currentSelection}
						totalNumberOfTraits={traits.hairTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.clothingTrait.name}
						description={traits.clothingTrait.description}
						onTraitSelection={traits.clothingTrait.updateCurrentSelection}
						currentTraitNumber={traits.clothingTrait.currentSelection}
						totalNumberOfTraits={traits.clothingTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.mouthTrait.name}
						description={traits.mouthTrait.description}
						onTraitSelection={traits.mouthTrait.updateCurrentSelection}
						currentTraitNumber={traits.mouthTrait.currentSelection}
						totalNumberOfTraits={traits.mouthTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.eyesTrait.name}
						description={traits.eyesTrait.description}
						onTraitSelection={traits.eyesTrait.updateCurrentSelection}
						currentTraitNumber={traits.eyesTrait.currentSelection}
						totalNumberOfTraits={traits.eyesTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.thinkingTrait.name}
						description={traits.thinkingTrait.description}
						onTraitSelection={traits.thinkingTrait.updateCurrentSelection}
						currentTraitNumber={traits.thinkingTrait.currentSelection}
						totalNumberOfTraits={traits.thinkingTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.backgroundObjectTrait.name}
						description={traits.backgroundObjectTrait.description}
						onTraitSelection={
							traits.backgroundObjectTrait.updateCurrentSelection
						}
						currentTraitNumber={traits.backgroundObjectTrait.currentSelection}
						totalNumberOfTraits={
							traits.backgroundObjectTrait.maxElements[gender]
						}
					/>
				</TraitPickerAreaMobile>
				<TraitPickerArea>
					<Trait
						trait={traits.mouthTrait.name}
						description={traits.mouthTrait.description}
						onTraitSelection={traits.mouthTrait.updateCurrentSelection}
						currentTraitNumber={traits.mouthTrait.currentSelection}
						totalNumberOfTraits={traits.mouthTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.eyesTrait.name}
						description={traits.eyesTrait.description}
						onTraitSelection={traits.eyesTrait.updateCurrentSelection}
						currentTraitNumber={traits.eyesTrait.currentSelection}
						totalNumberOfTraits={traits.eyesTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.thinkingTrait.name}
						description={traits.thinkingTrait.description}
						onTraitSelection={traits.thinkingTrait.updateCurrentSelection}
						currentTraitNumber={traits.thinkingTrait.currentSelection}
						totalNumberOfTraits={traits.thinkingTrait.maxElements[gender]}
					/>
					<Trait
						trait={traits.backgroundObjectTrait.name}
						description={traits.backgroundObjectTrait.description}
						onTraitSelection={
							traits.backgroundObjectTrait.updateCurrentSelection
						}
						currentTraitNumber={traits.backgroundObjectTrait.currentSelection}
						totalNumberOfTraits={
							traits.backgroundObjectTrait.maxElements[gender]
						}
					/>
				</TraitPickerArea>
			</PickerArea>
			<ActionArea>
				<div>
					<ShuffleButton callback={shuffleCombination} />
				</div>
				<div>
					<Button
						text="Mint your NFT"
						type="button"
						variant="primary"
						fullWidth
						onClick={openMintModal}
					/>
				</div>
			</ActionArea>
		</SectionContainer>
	);
};
