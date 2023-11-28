import { signInWithPopup } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { auth, provider } from "../firebase"

export default function Login() {
  const router = useRouter()

  const allowedDomains = ["sfprep.org"]

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.

        const user = result.user

        const email = user.email

        if (!email) {
          return
        }

        const domain = email.split("@")[1]

        if (!allowedDomains.includes(domain)) {
          router.push("/not-allowed?error=auth/domain-not-allowed")
        } else {
          if(user.metadata.creationTime === user.metadata.lastSignInTime) {
            router.push("/onboarding")
          } else {
            router.push("/profile")
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // // The email of the user's account used.
        const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        router.push("/not-allowed?error=" + errorCode + "&message=" + errorMessage + "&email=" + email)
      })
  }

  return (
    <>
      <Head>
        <title>ScoreConnect Login</title>
      </Head>
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
