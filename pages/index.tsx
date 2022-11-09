import type { NextPage } from "next";
import Head from "next/head";
import { Body } from "components/body";
import { Footer } from "components/footer";
import Welcome from "components/welcome";

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
				<Welcome />
			</Body>
			<Footer />
		</div>
	);
};

export default Home;
