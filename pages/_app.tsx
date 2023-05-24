import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { GlobalStyles } from "global-styles";
import "animate.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="GoogleAnalytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
      <GlobalStyles />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
