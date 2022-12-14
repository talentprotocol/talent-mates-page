import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
import { Props } from "./types";
import { Button } from "shared-ui";

export const CongratulationsBuddyDialog = ({
	closeModal,
	imageSource,
}: Props) => {
	return (
		<Container
			onClick={(e) => {
				e.stopPropagation();
			}}
			className="animate__animated animate__fadeIn"
		>
			<XArea onClick={closeModal}>
				<CrossSVG />
			</XArea>
			{imageSource && (
				<img width="170" height="170" src={imageSource} alt="buddy" />
			)}
			<Typography type="h3" text="Congratulations, buddy!" />
			<Typography
				type="body1"
				text="We’re super happy to give you this NFT!"
				color="LIGHT_GREY"
			/>
			<ActionArea>
				<Button
					text="Share on Twitter"
					type="button"
					variant="tertiary"
					fullWidth
					onClick={() => {
						window.open(
							`https://twitter.com/intent/tweet?text=${encodeURI(
								"Check out Talent Mates, a customizable NFT avatar collection by @talentprotocol "
							)}&url=${window.location.origin}`,
							"_blank"
						);
					}}
				/>
				<StyledButton
					text="Awesome! Let’s do this!"
					type="link"
					variant="quaternary"
					href="https://beta.talentprotocol.com/join"
					target="_blank"
				/>
			</ActionArea>
		</Container>
	);
};
