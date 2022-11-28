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

const Home: NextPage = () => {
	const modalState = useModalState();
	const errorModalState = useErrorModalState();
	return (
		<div>
			<Head>
				<title>Talent Mates</title>
				<meta
					name="description"
					content="Talent Mates is a new NFT avatar collection, exclusive for the Talent Protocol community. Mint your NFT to enter a world where both talent and opportunities are abundant."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Modal isOpen={modalState.isOpen} onCloseModal={modalState.close}>
				<InvalidAccountDialog closeModal={modalState.close} />
			</Modal>
			<ErrorModal isOpen={errorModalState.isOpen} onCloseModal={errorModalState.close} errorText={errorModalState.errorMessage}/>
			<Body fullHeight={true}>
				<Welcome openModal={modalState.open} openErrorModal={errorModalState.open}/>
			</Body>
			<Footer fixed={true} />
		</div>
	);
};

export default Home;
