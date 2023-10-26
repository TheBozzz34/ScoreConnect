import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Head from "next/head"
import { redirect } from 'next/navigation'
import { Button } from "components/Button/Button"
import { auth } from '../firebase';

export default function Login() {
    const provider = new GoogleAuthProvider();
    
    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("user", user)
            
            redirect('/')

        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log("error", error)
        });
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
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="mx-auto place-self-center">
                <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                ScoreConnect Web
                </h1>
                <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
                ScoreConnect is a user-friendly digital scoreboard control software, designed for sports venues and event organizers. 
                The software offers wireless connectivity, customization options, and compatibility with various scoreboards, 
                making it an essential tool for efficient score management.
                </p>
                <Button href="/contact" className="mr-3 hover:bg-white hover:text-blue-400">
                Get started
                </Button>
                <Button
                href="/login"
                intent="secondary"
                className="hover:bg-blue-400 hover:text-white"
                >
                Login
                </Button>
            </div>
            </div>
        </section>
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="mx-auto place-self-center">
                <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                Login
                </h1>
                <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
                Login to your ScoreConnect account
                </p>
                <button onClick={signIn} className="mr-3 text-white hover:bg-white hover:text-blue-400 bg-blue-400 p-4 rounded-lg hover:border hover:border-blue-400">
                Sign in with Google
                </button>
            </div>
            </div>
        </section>
        </>
    )
}
