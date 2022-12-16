import { useRouter } from "next/router";
import { MatePreview } from "components/mate-preview";
import { Body } from "components/body";
import Head from "next/head";

const Mate = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<>
			<Head>
				<title>Talent Mate{id ? ` #${id}` : "s NFTs by Talent Protocol"}</title>
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
					content={id ? `Talent Mate #${id}` : "Talent Mates NFTs by Talent Protocol"}
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
			<Body fullHeight>
				<MatePreview id={id as string} />
			</Body>
		</>
	);
};

export default Mate;
