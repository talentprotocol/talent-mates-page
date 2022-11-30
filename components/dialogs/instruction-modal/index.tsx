import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
import { Props } from "./types";

export const InstructionModalDialog = ({
	closeModal
}: Props) => {
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
			<img width="170" height="170" src="https://d6cu1tnva62p2.cloudfront.net/body/male/01.png" alt="buddy" />
			<Typography type="h3" text="Congratulation, buddy!" />
			<Typography
				type="body1"
				text="We’re super happy to give this rare skin trait only for Talent House Alumni!"
				color="LIGHT_GREY"
			/>
			<ActionArea>
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
