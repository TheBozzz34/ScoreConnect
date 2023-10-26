import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head"
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import NavBar from "components/Navbar/Navbar";
import { auth } from '../../firebase';

export default function Profile() {
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                router.push('/login')
            }
        });

    }, [router])

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
                            Dashboard
                        </h1>
                        <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
                            Connection Status:
                        </p>
                        <div className="flex flex-col space-y-4 border-2 border-gray-200 rounded-lg p-4">
                            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                                Backend:
                                <span className="rounded bg-gray-300 p-1 w-fit" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    Disconnected
                                    <svg height="1em" width="1em" style={{ marginLeft: '0.3em' }}>
                                        <circle cx="0.5em" cy="0.5em" r="0.4em" stroke="black" stroke-width="0.1em" fill="red" />
                                    </svg>
                                </span>
                            </p>
                            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                                Scoreboard:
                                <span className="rounded bg-gray-300 p-1 w-fit" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    Disconnected
                                    <svg height="1em" width="1em" style={{ marginLeft: '0.3em' }}>
                                        <circle cx="0.5em" cy="0.5em" r="0.4em" stroke="black" stroke-width="0.1em" fill="red" />
                                    </svg>
                                </span>
                            </p>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

/*
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            session: await auth.getUser(context)
        }
    }
}
*/

