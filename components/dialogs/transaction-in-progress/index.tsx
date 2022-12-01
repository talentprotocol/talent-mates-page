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
			<Spinner isShown noBox/>
			<Typography type="h3" text="Transaction in progress" />
			<Typography
				type="general"
				text="This can take a few minutes depending on gas."
				color="LIGHT_GREY"
			/>
			<ActionArea>
				<StyledButton
					text="View transaction status"
					type="link"
					variant="quaternary"
					target="_blank"
					// @ts-ignore
					href={`https://alfajores.celoscan.io/tx/${window.mintHash}`}
				/>
			</ActionArea>
		</Container>
	);
};
