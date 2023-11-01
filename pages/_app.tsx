import "../styles/tailwind.css"
import { AppProps } from "next/app"
import { WebSocketProvider } from '../context/WebSocketContext';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebSocketProvider>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
}

export default MyApp
