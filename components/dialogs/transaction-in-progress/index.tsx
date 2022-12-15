import { Spinner, Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
import { Props } from "./types";

export const TransactionInProgressDialog = ({ closeModal }: Props) => {
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
			<Spinner isShown noBox />
			<Typography type="h3" text="Making changes to your Mate!" />
			<Typography
				type="general"
				text="We're changing your mate to look exactly like you want it to! Keep this window open during the process."
				color="LIGHT_GREY"
			/>
		</Container>
	);
};
