import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head"
import { redirect } from "next/navigation";
import React, { useEffect } from 'react';
import NavBar from "components/Navbar/Navbar";
import { auth } from '../../firebase';

export default function Profile() {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                // User is signed out
                // ...
                redirect('/login')
            }
        });

    }, [])

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
                            Profile
                        </h1>
                        <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
                            Hello {auth.currentUser?.displayName} !
                        </p>
                        <div className="flex flex-col space-y-4 border-2 border-gray-200 rounded-lg p-4">
                            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                                Email: <span className="rounded bg-gray-300 p-1 w-fit">{auth.currentUser?.email}</span>
                            </p>
                            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                                UID: <span className="rounded bg-gray-300 p-1 w-fit">{auth.currentUser?.uid}</span>
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

