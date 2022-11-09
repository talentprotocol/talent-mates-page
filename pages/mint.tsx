import type { NextPage } from "next";
import Head from "next/head";
import { NFTPicker } from "components/nft-picker";
import { Body } from "components/body";
import { Footer } from "components/footer";

const Home: NextPage = () => {
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
			<Body>
				<NFTPicker />
			</Body>
			<Footer />
		</div>
	);
};

export default Home;
