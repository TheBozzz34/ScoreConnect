import * as Ably from 'ably';
import "../styles/tailwind.css"
import { AppProps } from "next/app"
import Footer from 'components/Footer/Footer';
import { WebSocketProvider } from "../context/WebSocketContext"
import { IsSsrMobileContext } from "../utils/useIsMobile";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
        <WebSocketProvider>
          <Component {...pageProps} />
        </WebSocketProvider>
        <Footer />
    </IsSsrMobileContext.Provider>
  )
}

export default MyApp
