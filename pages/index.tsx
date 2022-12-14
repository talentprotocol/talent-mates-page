import type { NextPage } from "next";
import Head from "next/head";
import { Body } from "components/body";
import { Footer } from "components/footer";
import Welcome from "components/welcome";
import Modal from "components/modal";
import { useModalState } from "components/modal/use-modal-state";
import { useErrorModalState } from "components/error-modal/use-modal-state";
import { InvalidAccountDialog } from "components/dialogs/invalid-account";
import ErrorModal from "components/error-modal";
import { HowItWorksDialog } from "components/dialogs/how-it-works";

const Home: NextPage = () => {
	const invalidAccountModalState = useModalState();
	const howItWorksModalState = useModalState();
	const errorModalState = useErrorModalState();
	return (
		<div>
			<Head>
				<title>Talent Mates NFTs by Talent Protocol</title>
				<meta
					name="description"
					content="Talent Mates is a new NFT avatar collection, exclusive for the Talent Protocol community. Mint your NFT to enter a world where both talent and opportunities are abundant."
				/>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
				></meta>
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:url" content="https://mates.talentprotocol.com" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Talent Mates NFTs by Talent Protocol"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					property="og:description"
					content="Talent Mates is a new NFT avatar collection, exclusive for the Talent Protocol community. Mint your NFT to enter a world where both talent and opportunities are abundant."
				/>
				<meta
					property="og:image"
					content="https://talentprotocol-mintingpage-qa.s3.eu-west-2.amazonaws.com/metaimage.jpg"
				/>
			</Head>
			<Modal
				isOpen={invalidAccountModalState.isOpen}
				onCloseModal={invalidAccountModalState.close}
			>
				<InvalidAccountDialog closeModal={invalidAccountModalState.close} />
			</Modal>
			<Modal
				isOpen={howItWorksModalState.isOpen}
				onCloseModal={howItWorksModalState.close}
			>
				<HowItWorksDialog closeModal={howItWorksModalState.close} />
			</Modal>
			<ErrorModal
				isOpen={errorModalState.isOpen}
				onCloseModal={errorModalState.close}
				errorText={errorModalState.errorMessage}
			/>
			<Body fullHeight>
				<Welcome
					openModal={howItWorksModalState.open}
					openErrorModal={errorModalState.open}
				/>
			</Body>
			<Footer fixed />
		</div>
	);
};

export default Home;
