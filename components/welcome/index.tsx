import { Button, Typography } from "shared-ui";
import { FirstSVG } from "./assets/first-svg";
import { ActionArea, Container, ContentArea, ImageArea } from "./styled";
import { Props } from "./types";

const Welcome = ({ openModal }: Props) => (
	<Container>
		<ContentArea>
			<Typography type="h1" text="Mint your Talent Protocol Mate." />
			<Typography
				type="body1"
				text="Create a beautiful web3 resume, make meaningful connections and access exciting web3 opportunities."
			/>
			<ActionArea>
				<Button
					type="button"
					variant="primary"
					text="Connect wallet"
					onClick={openModal}
				/>
				<Button
					type="button"
					variant="octonary"
					text="How it works"
					onClick={openModal}
				/>
			</ActionArea>
		</ContentArea>
		<ImageArea>
			<FirstSVG />
			<FirstSVG />
		</ImageArea>
	</Container>
);

export default Welcome;
