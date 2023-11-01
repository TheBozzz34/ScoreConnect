import { signInWithPopup } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import NavBar from "components/Navbar/Navbar"
import { auth, provider } from "../firebase"

export default function Login() {
  const router = useRouter()

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
        <meta property="og:url" content="https://next-enterprise.vercel.app/" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>ScoreConnect Web</title>
      </Head>
      <NavBar />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              ScoreConnect Login
            </h1>
            <button
              onClick={signIn}
              className="mr-3 rounded-lg bg-blue-400 p-4 text-white hover:border hover:border-blue-400 hover:bg-white hover:text-blue-400"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
