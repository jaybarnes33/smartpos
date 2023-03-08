import "../styles/globals.css";
import type { AppProps } from "next/app";
import DashProvider from "@/hooks/useDash";
import BillProvider from "@/hooks/useBill";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ModalProvider from "@/hooks/useModal";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <BillProvider>
        <ToastContainer />
        <DashProvider>
          <Component {...pageProps} />
        </DashProvider>
      </BillProvider>
    </ModalProvider>
  );
}
