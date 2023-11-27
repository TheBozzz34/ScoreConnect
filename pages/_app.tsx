import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import "../styles/tailwind.css"
import { AppProps } from "next/app"
import Footer from 'components/Footer/Footer';
import { WebSocketProvider } from "../context/WebSocketContext"


const client = new Ably.Realtime.Promise({ key: '4iztzg.5uLJRA:yrpSpBPszqaZP17ZNIDhIYPoxTmhtXEdbc3kbICMotE', clientId: 'ScoreConnectWeb' });

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AblyProvider client={client}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
      <Footer />
    </AblyProvider>
  )
}

export default MyApp
