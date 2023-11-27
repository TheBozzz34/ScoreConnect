import "../styles/tailwind.css"
import Hotjar from "@hotjar/browser"
import { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import Footer from "components/Footer/Footer"
import NavBar from "components/Navbar/Navbar"
import { WebSocketProvider } from "../context/WebSocketContext"
import { IsSsrMobileContext } from "../utils/useIsMobile"

function MyApp({ Component, pageProps }: AppProps) {
  Hotjar.init(2349532, 6)
  return (
    <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
      <WebSocketProvider>
        <Head>
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <meta property="og:url" content="https://sc.necrozma.xyz" />
          <meta property="og:title" content="ScoreConnect Web" />
          <meta
            property="og:description"
            content="ScoreConnect is a user-friendly digital scoreboard control software, designed for sports venues and event organizers."
          />
          <meta property="og:image" content="https://sc.necrozma.xyz/banner.png" />
          <title>ScoreConnect Web</title>
        </Head>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-G3GH38QDFZ" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-G3GH38QDFZ');
        `}
        </Script>
        <NavBar />
        <Component {...pageProps} />
      </WebSocketProvider>
      <Footer />
    </IsSsrMobileContext.Provider>
  )
}

export default MyApp
