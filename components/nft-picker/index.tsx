import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "shared-ui";
import {
	PickerArea,
	TraitPickerArea,
	DisplayArea,
	GenderPicker,
	ImageHolder,
	ActionArea,
} from "./styled";
import { useTrait } from "./hooks/use-trait";
import { Trait } from "./trait";
import { ShuffleButton } from "./suffle-button";
import { Props } from "./types";

const CANVAS_SIDE = 552;

export const NFTPicker = ({ openModal, setImageSource }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [gender, setGender] = useState<"male" | "female">("male");
	const traits = {
		backgroundTrait: useTrait({
			name: "background",
			description: "Background",
			maxElements: { male: 8, female: 8 },
			gender,
		}),
		skinTrait: useTrait({
			name: "body",
			description: "Skin",
			maxElements: { male: 7, female: 7 },
			gender,
		}),
		clothingTrait: useTrait({
			name: "clothing",
			description: "Clothes",
			maxElements: { male: 24, female: 24 },
			gender,
		}),
		hairTrait: useTrait({
			name: "hair",
			description: "Hair",
			maxElements: { male: 6, female: 6 },
			gender,
		}),
		mouthTrait: useTrait({
			name: "mouth",
			description: "Mouth",
			maxElements: { male: 9, female: 9 },
			gender,
		}),
		eyesTrait: useTrait({
			name: "eyes",
			description: "Eyes",
			maxElements: { male: 11, female: 11 },
			gender,
		}),
		thinkingTrait: useTrait({
			name: "thinking",
			description: "Thinking",
			maxElements: { male: 19, female: 19 },
			gender,
		}),
	};
	const openMintModal = useCallback(
		(event: SyntheticEvent) => {
			if (typeof window !== "undefined" && canvasRef.current) {
				//const url = canvasRef.current.toDataURL("image/png");
				//setImageSource(url);
				openModal(event);
			}
		},
		[openModal, canvasRef.current]
	);
	useEffect(() => {
		if (typeof window !== "undefined" && canvasRef.current) {
			const canvasContext = canvasRef?.current.getContext("2d");
			canvasContext?.clearRect(0, 0, CANVAS_SIDE, CANVAS_SIDE);
			const promisesList: Promise<CanvasImageSource>[] = [];
			const traitList = Object.keys(traits);
			traitList.forEach((trait) => {
				// @ts-ignore
				if (traits[trait].currentSelection !== -1) {
					const traitImage = new Image();
					//traitImage.crossOrigin = 'Anonymous';
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
			});
			Promise.all(promisesList).then((images) => {
				images.forEach((image) => {
					canvasContext?.drawImage(image, 0, 0, CANVAS_SIDE, CANVAS_SIDE);
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		traits.hairTrait,
		traits.backgroundTrait,
		traits.clothingTrait,
		traits.clothingTrait,
		traits.eyesTrait,
		traits.mouthTrait,
		traits.skinTrait,
		traits.thinkingTrait,
	]);
	return (
		<section>
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
							text="Male"
							type="button"
							variant={gender === "male" ? "quaternary" : "secondary"}
							fullWidth
							onClick={() => setGender("male")}
						/>
						<Button
							text="Female"
							type="button"
							variant={gender === "female" ? "quaternary" : "secondary"}
							fullWidth
							onClick={() => setGender("female")}
						/>
					</GenderPicker>
					<ImageHolder>
						<canvas
							ref={canvasRef}
							width={`${CANVAS_SIDE}px`}
							height={`${CANVAS_SIDE}px`}
						/>
					</ImageHolder>
				</DisplayArea>
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
						trait={"background_object"}
						description={"Background Object (?)"}
						onTraitSelection={() => {}}
						currentTraitNumber={1}
						totalNumberOfTraits={11}
					/>
				</TraitPickerArea>
			</PickerArea>
			<ActionArea>
				<div>
					<ShuffleButton
						callback={() =>
							Object.values(traits).forEach((trait) => trait.shuffle())
						}
					/>
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
		</section>
	);
};
