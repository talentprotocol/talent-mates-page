import type { NextPage } from "next";
import Head from "next/head";
import { Body } from "components/body";
import { Footer } from "components/footer";
import Welcome from "components/welcome";
import Modal from "components/modal";
import { useModalState } from "components/modal/use-modal-state";
import { InvalidAccountDialog } from "components/dialogs/invalid-account";

const Home: NextPage = () => {
	const modalState = useModalState();
	return (
		<div>
			<Head>
				<title>NFT Picker</title>
				<meta
					name="description"
					content="NFT Picker for Talent Protocol Avatar collection"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Modal isOpen={modalState.isOpen} onCloseModal={modalState.close}>
				<InvalidAccountDialog closeModal={modalState.close} />
			</Modal>
			<Body fullHeight={true} >
				<Welcome openModal={modalState.open} />
			</Body>
			<Footer fixed={true}/>
		</div>
	);
};

export default Home;
