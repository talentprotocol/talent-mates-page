import { Button, Typography } from "shared-ui";
import { FirstSVG } from "./assets/first-svg";
import { ActionArea, Container, ContentArea, ImageArea } from "./styled";

const Welcome = () => (
	<Container>
		<ContentArea>
			<Typography type="h1" text="Mint your Talent Protocol Mate." />
			<Typography
				type="body1"
				text="Create a beautiful web3 resume, make meaningful connections and access exciting web3 opportunities."
			/>
			<ActionArea>
				<Button type="link" variant="primary" text="Connect wallet" />
				<Button type="link" variant="octonary" text="How it works" />
			</ActionArea>
		</ContentArea>
		<ImageArea>
			<FirstSVG />
			<FirstSVG />
		</ImageArea>
	</Container>
);

export default Welcome;
