import "../styles/globals.css";
import type { AppProps } from "next/app";
import DashProvider from "@/hooks/useDash";
import BillProvider from "@/hooks/useBill";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import ModalProvider from "@/hooks/useModal";
import Script from "next/script";
import { useRouter } from "next/router";
import LayoutWithSide from "@/components/Layout/LayoutWithSide";

export default function App({ Component, pageProps }: AppProps) {
  const noside = ["/register", "/login"];

  const { pathname } = useRouter();
  return (
    <BillProvider>
      <Head>
        <title>Buildrite POS</title>
      </Head>
      <ModalProvider>
        <ToastContainer />
        <DashProvider>
          {!noside.includes(pathname) ? (
            <LayoutWithSide>
              <Component {...pageProps} />
            </LayoutWithSide>
          ) : (
            <Component {...pageProps} />
          )}
        </DashProvider>
      </ModalProvider>
      {/* <Script src="/epos.js" /> */}
    </BillProvider>
  );
}
