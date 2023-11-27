import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import "../styles/tailwind.css"
import { AppProps } from "next/app"
import Footer from 'components/Footer/Footer';
import { WebSocketProvider } from "../context/WebSocketContext"
import { IsSsrMobileContext } from "../utils/useIsMobile";


const client = new Ably.Realtime.Promise({ key: '4iztzg.5uLJRA:yrpSpBPszqaZP17ZNIDhIYPoxTmhtXEdbc3kbICMotE', clientId: 'ScoreConnectWeb' });

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
      <AblyProvider client={client}>
        <WebSocketProvider>
          <Component {...pageProps} />
        </WebSocketProvider>
        <Footer />
      </AblyProvider>
    </IsSsrMobileContext.Provider>
  )
}

export default MyApp
