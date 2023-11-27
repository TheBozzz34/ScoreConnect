import Hotjar from "@hotjar/browser"
import { signInWithPopup } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import Script from "next/script"
import NavBar from "components/Navbar/Navbar"
import { auth, provider } from "../firebase"

export default function Login() {
  const router = useRouter()

  Hotjar.init(2349532, 6)

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user
        console.log("user", user)

        router.push("/profile")
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("error", error)
      })
  }

  return (
    <>
      <Head>
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
      <section>
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-[#454138] md:text-5xl xl:text-6xl">
              ScoreConnect Login
            </h1>
            <button
              onClick={signIn}
              className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
