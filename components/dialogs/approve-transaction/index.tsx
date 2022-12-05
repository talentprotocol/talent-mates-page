import { Spinner, Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { Container, XArea } from "./styled";
import { Props } from "./types";

export const ApproveTransactionDialog = ({ closeModal }: Props) => {
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
			<Typography type="h3" text="Approve the transaction" />
			<Typography
				type="general"
				text="Your wallet will receive a transaction. Approve it to receive your MATE!"
				color="LIGHT_GREY"
			/>
		</Container>
	);
};
