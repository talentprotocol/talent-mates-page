import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyles } from "global-styles";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyles />
			<Component {...pageProps} />
			<Analytics />
		</>
	);
}

export default MyApp;
