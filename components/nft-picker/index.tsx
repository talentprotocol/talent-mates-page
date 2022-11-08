import { useEffect, useMemo, useRef, useState } from "react";
import {
	Header,
	ButtonIcon,
	TitleArea,
	PickerArea,
	TraitPickerArea,
	DisplayArea,
	GenderPicker,
	ImageHolder,
	TraitArea,
	TraitSwitchArea,
	TraitSwitchButton,
	TraitSwitchInfo,
} from "./styled";
import { Button, Typography } from "shared-ui";
import { TraitProps } from "./types";
import { useTrait } from "./hooks/use-trait";
//import TRAITS from "./trait_list.json";

//import NFTImage from "../assets/output.png";
// todo: move away from this file
const Trait = ({
	description,
	onTraitSelection,
	currentTraitNumber,
	totalNumberOfTraits,
}: TraitProps) => (
	<TraitArea>
		<Typography type="body1" text={description} color="BLACK" />
		<TraitSwitchArea>
			<Button
				type="button"
				variant="quaternary"
				onClick={() => onTraitSelection(-1)}
			>
				<TraitSwitchButton>--W</TraitSwitchButton>
			</Button>
			<Button
				type="button"
				variant="quaternary"
				onClick={() => onTraitSelection(1)}
			>
				<TraitSwitchButton>--E</TraitSwitchButton>
			</Button>
			<TraitSwitchInfo>
				<p>
					<>
						{currentTraitNumber !== -1 ? `${currentTraitNumber}/${totalNumberOfTraits}` : "None"}
					</>
				</p>
			</TraitSwitchInfo>
		</TraitSwitchArea>
	</TraitArea>
);

// todo: remove
const onTraitSelection = (e: any, trait: string, option: string) => {};

export const NFTPicker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const traits = {
	backgroundTrait: useTrait({ name: "background", description: "Background", maxElements: {male: 8, female: 8}, gender}),
	skinTrait: useTrait({ name: "body", description: "Skin", maxElements: {male: 7, female: 7}, gender}),
	clothingTrait: useTrait({ name: "clothing", description: "Clothes", maxElements: {male: 24, female: 24}, gender}),
	hairTrait: useTrait({ name: "hair", description: "Hair", maxElements: {male: 6, female: 6}, gender}),
	mouthTrait: useTrait({ name: "mouth", description: "Mouth", maxElements: {male: 9, female: 9}, gender}),
	eyesTrait: useTrait({ name: "eyes", description: "Eyes", maxElements: {male: 12, female: 12}, gender}),
	thinkingTrait: useTrait({ name: "thinking", description: "Thinking", maxElements: {male: 19, female: 19}, gender}),
  };
  useEffect(() => {
    if (typeof window !== "undefined" && canvasRef.current) {
      const canvasContext = canvasRef?.current.getContext("2d");
      canvasContext?.clearRect(0, 0, 568, 568);
	  const promisesList: Promise<CanvasImageSource>[] = [];
	  const traitList = Object.keys(traits);
	  traitList.forEach(trait => {
		// @ts-ignore
		if (traits[trait].currentSelection !== -1) {
			const traitImage = new Image();
			// @ts-ignore
			traitImage.src = traits[trait].image;
			const traitPromise = new Promise<HTMLImageElement>((resolve, reject) => {
				traitImage.onload = () => {
				  resolve(traitImage);
				}
				traitImage.onerror = () => {
				  reject(null);
				}
			});
			promisesList.push(traitPromise);
		}
	  });
	  Promise.all(promisesList)
	  	.then((images) => {
			images.forEach(image => {
				canvasContext?.drawImage(image, 0, 0, 568, 568);
			});
		});
    }
  }, [traits.hairTrait, traits.backgroundTrait])
	return (
		<>
			<Header>
				<Button text={"Back"} type="link" variant="secondary" href="/">
					<ButtonIcon>--W</ButtonIcon>
				</Button>
				<TitleArea>
					<Typography
						type="h3"
						text={"Customize your Talent Protocol MATE."}
						color="BLACK"
					/>
				</TitleArea>
			</Header>
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
							variant={gender === "male" ? "pentanary" : "secondary"}
							fullWidth
							onClick={() => setGender("male")}
						/>
						<Button
							text="Female"
							type="button"
							variant={gender === "female" ? "pentanary" : "secondary"}
							fullWidth
							onClick={() => setGender("female")}
						/>
					</GenderPicker>
					<ImageHolder>
            <canvas ref={canvasRef} width="568px" height="568px"/>
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
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={11}
					/>
				</TraitPickerArea>
			</PickerArea>
		</>
	);
};
