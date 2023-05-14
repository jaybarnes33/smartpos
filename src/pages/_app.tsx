import "../styles/globals.css";
import type { AppProps } from "next/app";
import DashProvider from "@/hooks/useDash";
import BillProvider from "@/hooks/useBill";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import ModalProvider from "@/hooks/useModal";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BillProvider>
      <Head>
        <title>Buildrite POS</title>
      </Head>
      <ModalProvider>
        <ToastContainer />
        <DashProvider>
          <Component {...pageProps} />
        </DashProvider>
      </ModalProvider>
      {/* <Script src="/epos.js" /> */}
    </BillProvider>
  );
}
