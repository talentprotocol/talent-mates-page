import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
import { Props } from "./types";

export const InvalidAccountDialog = ({ closeModal }: Props) => {
	return (
		<Container
			onClick={(e) => {
				e.stopPropagation();
			}}
			className="animate__animated animate__fadeInUp"
		>
			<XArea onClick={closeModal}>
				<CrossSVG />
			</XArea>
			<Typography type="h3" text="Hmm... wallet address doesn’t look valid." />
			<Typography
				type="body1"
				text="You need to have a Talent Protocol account and launch a token."
				color="LIGHT_GREY"
			/>
			<ActionArea>
				<StyledButton
					text="More info"
					type="link"
					variant="quaternary"
					href="https://beta.talentprotocol.com/join"
					target="_blank"
				/>
			</ActionArea>
		</Container>
	);
};
