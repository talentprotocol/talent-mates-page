import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Typography } from "shared-ui";
import { FirstSVG } from "./assets/first-svg";
import { SecondSVG } from "./assets/second-svg";
import { TwitterSVG } from "./assets/twitter-svg";
import {
	ActionArea,
	Container,
	ContentArea,
	ImageArea,
	CalloutArea,
	StyledButton,
} from "./styled";
import { Props } from "./types";

// const paramsForMetamask = {
// 	chainId: "0xaef3",
// 	chainName: "Alfajores Testnet",
// 	nativeCurrency: { name: "Alfajores Celo", symbol: "A-CELO", decimals: 18 },
// 	rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
// 	blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
// 	iconUrls: ["future"],
// };

const paramsForMetamask = {
	chainId: "0x89",
	chainName: "Polygon",
	nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
	rpcUrls: ["https://polygon-rpc.com/"],
	blockExplorerUrls: ["https://polygonscan.com/"],
	iconUrls: ["future"],
};

const getCode = (): string | null => {
	// @ts-ignore
	const url = new URL(document.location);
	return url.searchParams.get("code");
};

const getURL = (): string => {
	const code = getCode();
	if (code) {
		return `/mint?code=${code}`;
	} else {
		return "/mint";
	}
};

const Welcome = ({ openModal, openErrorModal }: Props) => {
	const router = useRouter();
	const [alreadyConnected, setAlreadyConnected] = useState(false);

	const switchNetwork = async () => {
		const chainHex = ethers.utils.hexValue(ethers.utils.hexlify(137));
		try {
			// @ts-ignore
			const { ethereum } = window;
			const provider = new ethers.providers.Web3Provider(ethereum);
			await provider.send("wallet_switchEthereumChain", [
				{ chainId: chainHex },
			]);
			window.location.href = getURL();
		} catch (error: any) {
			console.log(error);
			// metamask mobile throws an error but that error has no code
			// https://github.com/MetaMask/metamask-mobile/issues/3312
			// @ts-ignore
			const { ethereum } = window;
			const provider = new ethers.providers.Web3Provider(ethereum);

			if (!!error.code || error.code === 4902) {
				await provider.send("wallet_addEthereumChain", [paramsForMetamask]);
				await provider.send("wallet_switchEthereumChain", [
					{ chainId: chainHex },
				]);
				window.location.href = getURL();
			}
		}
	};

	const connectToWallet = useCallback(async () => {
		const endOfYear = new Date("01 Jan 2024 00:00:00 GMT");
		const currentTime = new Date();
		if (currentTime.getUTCFullYear() >= endOfYear.getUTCFullYear()) {
			return;
		}

		if (alreadyConnected) {
			window.location.href = getURL();
			return;
		}

		try {
			// @ts-ignore
			const { ethereum } = window;
			if (!ethereum) {
				openErrorModal("Metamask not found");
				return;
			}
			if (ethereum.isMetaMask) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				await provider.send("eth_requestAccounts", []);
				// @TODO: change to polygon mainnet
				if (ethereum.networkVersion !== "137") {
					openErrorModal(
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<div style={{ marginBottom: 24 }}>
								You are connected to the wrong network, we are on Matic
								(Polygon) with the chain id 137
							</div>
							<Button
								type="button"
								variant="primary"
								text="Switch network"
								onClick={() => switchNetwork()}
							/>
						</div>
					);
				} else {
					const code = getCode();
					if (code) {
						router.push(`/mint?code=${code}`);
					} else {
						router.push("/mint");
					}
				}
			}
		} catch (err) {
			console.error(err);
			openErrorModal("Something happened when connecting to Metamask");
		}
	}, [alreadyConnected]);

	const checkForWalletConnection = async () => {
		// @ts-ignore
		const { ethereum } = window;

		if (ethereum.isMetaMask) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const accounts = await provider.send("eth_accounts", []);
			if (accounts.length > 0) {
				setAlreadyConnected(true);
			}
		}
	};

	useEffect(() => {
		checkForWalletConnection();
	});

	return (
		<>
			<Container>
				<CalloutArea>
					<ContentArea>
						<Typography type="h1" text="Talent Mates V2 coming soon." />
						<Typography
							type="body1"
							text="Talent Mates V1 come from a faraway planet, where everyone can find fulfilling work. Minting is now over, stay tunned for V2."
						/>
						<ActionArea>
							<Button
								type="button"
								variant="primary"
								text={"Minting ended"}
								onClick={connectToWallet}
								disabled={true}
							/>
							<StyledButton
								type="button"
								variant="hexanary"
								fullWidth={false}
								onClick={() => {
									window.open(
										`https://twitter.com/intent/tweet?text=${encodeURI(
											"Check out Talent Mates, a customizable NFT avatar collection by @TalentProtocol "
										)}&hashtags=TalentMates&url=${window.location.origin}`,
										"_blank"
									);
								}}
							>
								<>
									Share on{" "}
									<div style={{ marginLeft: "6px", display: "flex" }}>
										<TwitterSVG />
									</div>
									<span style={{ color: "black", marginLeft: "4px" }}>
										Twitter
									</span>
								</>
							</StyledButton>
						</ActionArea>
					</ContentArea>
					<ImageArea>
						<FirstSVG />
						<SecondSVG />
					</ImageArea>
				</CalloutArea>
			</Container>
		</>
	);
};

export default Welcome;
