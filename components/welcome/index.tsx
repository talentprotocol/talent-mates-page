import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button, Typography } from "shared-ui";
import { FirstSVG } from "./assets/first-svg";
import { ActionArea, Container, ContentArea, ImageArea } from "./styled";
import { Props } from "./types";

const Welcome = ({ openModal }: Props) => {
	const router = useRouter();
	const connectToWallet = useCallback(async () => {
		try {
			// const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
			// @ts-ignore
			const { ethereum } = window;
			if (ethereum.isMetaMask) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				await provider.send("eth_requestAccounts", []);
				await provider.getNetwork();
				router.push("/mint");
			}
		} catch {
			// @ts-ignore
			openModal();
		}
	}, []);
	return (
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
						onClick={connectToWallet}
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
};

export default Welcome;
