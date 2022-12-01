import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Button, Typography } from "shared-ui";
import { FirstSVG } from "./assets/first-svg";
import { ActionArea, Container, ContentArea, ImageArea } from "./styled";
import { Props } from "./types";

const Welcome = ({ openModal, openErrorModal }: Props) => {
	const router = useRouter();
	const connectToWallet = useCallback(async () => {
		try {
			// const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);
			// @ts-ignore
			const { ethereum } = window;
			if (!ethereum) {
				openErrorModal("Metamask not found");
				return;
			}
			if (ethereum.isMetaMask) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				await provider.send("eth_requestAccounts", []);
				console.log(ethereum.networkVersion);
				if (ethereum.networkVersion !== "44787") {
					openErrorModal(`You are connected to the wrong network, we are on Alfajores Testnet with the chain id 44787`);
				} else {
					router.push("/mint");
				}
			}
		} catch (err) {
			console.log(err);
			// @ts-ignore
			openModal();
		}
	}, []);
	return (
		<Container>
			<ContentArea>
				<Typography type="h1" text="Create your Talent Mate." />
				<Typography
					type="body1"
					text="Talent Mates come from a faraway planet, where everyone can find fulfilling work. Mint your mate NFT to enter a world where both talent and opportunities are abundant."
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
