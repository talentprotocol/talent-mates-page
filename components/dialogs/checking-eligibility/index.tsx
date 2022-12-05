import { Spinner, Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { Container, XArea } from "./styled";
import { Props } from "./types";

export const CheckingElegibilityDialog = ({ closeModal }: Props) => {
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
			<Spinner isShown noBox />
			<Typography type="h3" text="Checking elegibility" />
			<Typography
				type="general"
				text="Hold on until we check all the requirements before the mint"
				color="LIGHT_GREY"
			/>
		</Container>
	);
};
