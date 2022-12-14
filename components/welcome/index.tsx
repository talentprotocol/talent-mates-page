import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Typography } from "shared-ui";
import { FirstSVG } from "./assets/first-svg";
import { SecondSVG } from "./assets/second-svg";
import { ActionArea, Container, ContentArea, ImageArea } from "./styled";
import { Props } from "./types";

// const paramsForMetamask = {
// 	"chainId": "0xaef3",
// 	"chainName": "Alfajores Testnet",
// 	"nativeCurrency": { "name": "Alfajores Celo", "symbol": "A-CELO", "decimals": 18 },
// 	"rpcUrls": ["https://alfajores-forno.celo-testnet.org"],
// 	"blockExplorerUrls": ["https://alfajores-blockscout.celo-testnet.org/"],
// 	"iconUrls": ["future"]
// };

const paramsForMetamask = {
	"chainId": "0x89",
	"chainName": "Polygon",
	"nativeCurrency": { "name": "MATIC", "symbol": "MATIC", "decimals": 18 },
	"rpcUrls": ["https://polygon-rpc.com/"],
	"blockExplorerUrls": ["https://polygonscan.com/"],
	"iconUrls": ["future"]
};

const Welcome = ({ openModal, openErrorModal }: Props) => {
	const router = useRouter();
	const [alreadyConnected, setAlreadyConnected] = useState(false);

	const switchNetwork = async () => {
		const chainHex = ethers.utils.hexValue(ethers.utils.hexlify(44787));
		try {
			// @ts-ignore
      const { ethereum } = window;
			const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("wallet_switchEthereumChain", [{ chainId: chainHex }]);
			window.location.href = "/mint";
    } catch (error: any) {
      console.log(error);
      // metamask mobile throws an error but that error has no code
      // https://github.com/MetaMask/metamask-mobile/issues/3312
			// @ts-ignore
      const { ethereum } = window;
			const provider = new ethers.providers.Web3Provider(ethereum);

      if (!!error.code || error.code === 4902) {
				await provider.send("wallet_addEthereumChain", [paramsForMetamask]);
        await provider.send("wallet_switchEthereumChain", [{ chainId: chainHex }]);
				window.location.href = "/mint";
      }
		}
	}

	const connectToWallet = useCallback(async () => {
		if (alreadyConnected) {
			window.location.href = "/mint";
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
						<div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
							<div style={{marginBottom: 24}}>You are connected to the wrong network, we are on Polygon with the chain id 137</div>
							<Button
								type="button"
								variant="primary"
								text="Switch network"
								onClick={() => switchNetwork()}
							/>
						</div>
					);
				} else {
					router.push("/mint");
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
						text={alreadyConnected ? "Mint your Mate!" : "Connect wallet"}
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
				<SecondSVG />
			</ImageArea>
		</Container>
	);
};

export default Welcome;
