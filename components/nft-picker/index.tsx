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
						{currentTraitNumber}/{totalNumberOfTraits}
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
  const backgroundTrait = useTrait({ name: "background", description: "Background", maxElements: {male: 8, female: 8}, gender});
  const hairTrait = useTrait({ name: "hair", description: "Hair", maxElements: {male: 6, female: 6}, gender});
  useEffect(() => {
    if (typeof window !== "undefined" && canvasRef.current) {
      const canvasContext = canvasRef?.current.getContext("2d");
      canvasContext?.clearRect(0, 0, 568, 568);
      const backgroundImage = new Image();
      backgroundImage.src = backgroundTrait.image;
      backgroundImage.onload = () => {
        canvasContext?.drawImage(backgroundImage, 0, 0, 568, 568);
      }
      const hairImage = new Image();
      hairImage.src = hairTrait.image;
      hairImage.onload = () => {
        canvasContext?.drawImage(hairImage, 0, 0, 568, 568);
      }
    }
  }, [hairTrait, backgroundTrait])
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
						trait={backgroundTrait.name}
						description={backgroundTrait.description}
						onTraitSelection={backgroundTrait.updateCurrentSelection}
						currentTraitNumber={backgroundTrait.currentSelection}
						totalNumberOfTraits={backgroundTrait.maxElements[gender]}
					/>
					<Trait
						trait={"skin"}
						description={"Skin"}
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={9}
					/>
					<Trait
						trait={hairTrait.name}
						description={hairTrait.description}
						onTraitSelection={hairTrait.updateCurrentSelection}
						currentTraitNumber={hairTrait.currentSelection}
						totalNumberOfTraits={hairTrait.maxElements[gender]}
					/>
					<Trait
						trait={"clothes"}
						description={"Clothes"}
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={11}
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
						trait={"mouth"}
						description={"Mouth"}
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={8}
					/>
					<Trait
						trait={"eyes"}
						description={"Eyes"}
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={9}
					/>
					<Trait
						trait={"thinking_cloud"}
						description={"Thinking Cloud"}
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={10}
					/>
					<Trait
						trait={"background_object"}
						description={"Background Object"}
						onTraitSelection={onTraitSelection}
						currentTraitNumber={1}
						totalNumberOfTraits={11}
					/>
				</TraitPickerArea>
			</PickerArea>
		</>
	);
};
