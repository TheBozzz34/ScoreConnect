import { signInWithPopup } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { auth, provider } from "../firebase"
import Image from 'next/image'
import chromePic from '../public/chrome.png'

export default function Login() {
  const router = useRouter()

  const allowedDomains = ["sfprep.org"]

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user

        const email = user.email

        if (!email) {
          return
        }

        const domain = email.split("@")[1]

        if (!allowedDomains.includes(domain)) {
          router.push("/not-allowed?error=auth/domain-not-allowed")
        } else {
          if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            router.push("/onboarding")
          } else {
            router.push("/profile")
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // // The email of the user's account used.
        const email = error.email
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
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-auto space-y-8 shadow-lg glass">
            <Image
              src={chromePic}
              alt="Google"
              className="mx-auto w-24 h-24 rounded-full"
              quality={100}

            />
            <button className="transition-transform duration-300 w-full flex justify-center glass-button" onClick={signIn}>
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
