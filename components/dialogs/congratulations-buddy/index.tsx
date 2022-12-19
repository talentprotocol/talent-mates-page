import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
import { Props } from "./types";
import { Button } from "shared-ui";

export const CongratulationsBuddyDialog = ({
	closeModal,
	imageSource,
}: Props) => {
	const secondButton = () => {
		// @ts-ignore
		const { tokenIdOfUser } = window;
		if (tokenIdOfUser) {
			return (
				<StyledButton
					text="Show me!"
					type="link"
					variant="quaternary"
					href={`/mate/${tokenIdOfUser}`}
					target="_blank"
				/>
			);
		} else {
			return (
				<StyledButton
					text="Check it on opensea!"
					type="link"
					variant="quaternary"
					href="https://opensea.io/collection/talentprotocol"
					target="_blank"
				/>
			);
		}
	};

	const shareLink = () => {
		return window.location.href.replace(window.location.search, "");
	};

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
							)}&url=${shareLink()}`,
							"_blank"
						);
					}}
				/>
				{secondButton()}
			</ActionArea>
		</Container>
	);
};
