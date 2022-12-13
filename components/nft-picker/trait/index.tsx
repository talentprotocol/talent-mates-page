import { Button, Typography } from "shared-ui";
import {
	TraitSwitchButton,
	TraitSwitchInfo,
	TraitArea,
	TraitSwitchArea,
	TraitTitle,
	CommunityLevel
} from "./styled";
import { TraitProps } from "./types";
import TRAITS from "libs/traits/list.json";

const numberToTraitNumber = (value: Number): string => {
	if (value < 10) {
		// @ts-ignore
		return TRAITS["body"]["female"][`0${value}`];
	} else {
		// @ts-ignore
		return TRAITS["body"]["female"][value.toString()];
	}
}

export const Trait = ({
	description,
	onTraitSelection,
	currentTraitNumber,
	totalNumberOfTraits,
}: TraitProps) => (
	<TraitArea>
		<TraitTitle>
			<Typography type="body1" text={description} color="BLACK" />
			{description == "Skin" && <CommunityLevel><Typography type="body2" text={numberToTraitNumber(currentTraitNumber)} color="WHITE" /></CommunityLevel>}
		</TraitTitle>
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
				<Typography type="body1" color="BLACK">
					<>
						{currentTraitNumber !== -1
							? <><>{currentTraitNumber}</><span style={{color: "#697F8F"}}>/{totalNumberOfTraits.toString()}</span></>
							: "None"}
					</>
				</Typography>
			</TraitSwitchInfo>
		</TraitSwitchArea>
	</TraitArea>
);
