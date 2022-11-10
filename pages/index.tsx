import type { NextPage } from "next";
import Head from "next/head";
import { Body } from "components/body";
import { Footer } from "components/footer";
import Welcome from "components/welcome";
import Modal from "components/modal";
import { useModalState } from "components/modal/use-modal-state";

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
				<div>/</div>
			</Modal>
			<Body>
				<Welcome openModal={modalState.open} />
			</Body>
			<Footer />
		</div>
	);
};

export default Home;
