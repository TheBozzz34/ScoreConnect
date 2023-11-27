import "../styles/tailwind.css"
import { AppProps } from "next/app"
import Head from "next/head"
import Footer from "components/Footer/Footer"
import { WebSocketProvider } from "../context/WebSocketContext"
import { IsSsrMobileContext } from "../utils/useIsMobile"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
      <WebSocketProvider>
        <Head>
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        </Head>
        <Component {...pageProps} />
      </WebSocketProvider>
      <Footer />
    </IsSsrMobileContext.Provider>
  )
}

export default MyApp
