import type { AppProps } from "next/app";
import { GlobalStyles } from "global-styles";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
