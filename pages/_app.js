import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <meta name="theme-color" content="#001f3f"></meta>
        <link
          rel="apple-touch-icon"
          href="https://placehold.co/192x192.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="https://placehold.co/512x512.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="https://placehold.co/192x192.png"
        ></link>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
