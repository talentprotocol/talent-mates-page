import { Button, Typography } from "shared-ui";
import {
	TraitSwitchButton,
	TraitSwitchInfo,
	TraitArea,
	TraitSwitchArea,
} from "./styled";
import { TraitProps } from "./types";

export const Trait = ({
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
						{currentTraitNumber !== -1
							? `${currentTraitNumber}/${totalNumberOfTraits}`
							: "None"}
					</>
				</p>
			</TraitSwitchInfo>
		</TraitSwitchArea>
	</TraitArea>
);
