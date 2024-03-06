// app/page.tsx
'use client';

import { Card, CardFooter, Code, Divider, Image, Link, Snippet, Spacer } from "@nextui-org/react";
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth/cordova';
import { useEffect, useState } from 'react';

import { GithubIcon } from '../components/icons';
import { Navbar } from '../components/Navbar/nav-bar.component';
import { subtitle, title } from '../components/primatives';
import { siteConfig } from '../config/site';
import { auth } from '../firebase';


export default function Page() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userAccount, setUserAccount] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserAccount(user);
            } else {
                setUserAccount(null);
            }
        });
    }, []);


    return (
        <div className='text-white'>
            <Navbar />
            <section className="flex flex-col items-center justify-start gap-4 py-8 md:py-10">
                <div className="max-w-lg text-left justify-start">
                    <h1 className={title()}>Make&nbsp;</h1>
                    <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
                    <br />
                    <h1 className={title()}>
                        displays regardless of your design experience.
                    </h1>
                    <h4 className={subtitle({ class: "mt-4 text-white" })}>
                        Beautiful, fast and modern projector control app.
                    </h4>

                    <Spacer y={4} />

                    <div className="flex gap-3 justify-start">

                
                    <Link
                        isExternal
                        href={siteConfig.links.docs}
                        className="text-white bg-transparent border border-white rounded-md px-4 py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
                    >
                        Documentation
                    </Link>
                    <Link
                        isExternal
                        className="text-white bg-transparent border border-white rounded-md px-4 py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
                        href={siteConfig.links.github}
                    >
                        <GithubIcon size={20} />
                        GitHub
                    </Link>

                    <Snippet hideSymbol hideCopyButton className="bg-transparent border border-white rounded-md px-4 py-2 select-none">
                        <span className='text-white'>
                            Get started by emailing <Code color="primary">{/*siteConfig.contact[0].email*/}very epic contact email </Code>
                        </span>
                    </Snippet>

                    </div>

                </div>
            </section>

            <hr className="border-t border-white" />

            <section id="feature-cards" className="flex flex-col items-center justify-start gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-right justify-start">
                    <h1 className={title()}>Features</h1>
                    <h4 className={subtitle({ class: "mt-4 text-gray-300" })}>
                        Built with modern technologies, ScoreConnect is packed with features to make your life easier.
                    </h4>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="flex flex-row items-center justify-center gap-4 py-8 md:py-10">
                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 hover:scale-105 transition duration-300 ease-in-out" radius='md'>
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-full h-full object-cover"
                                src="https://images.squarespace-cdn.com/content/v1/65af8fbd2deabc7e06961ae1/1706217479790-RK827VAI1ESCMHOYGH5O/Social+Card.png"
                                radius='md'
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-white rounded-b-md">
                                <div className="flex grow gap-2 items-center">
                                    <Image
                                        alt="app icon"
                                        className="rounded-full w-11 h-11 bg-black"
                                        src="https://sc.necrozma.xyz/_next/image?url=%2Fyorha-no-2-type-b-1.png&w=256&q=75"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white/60">Powerful</p>
                                        <p className="text-white/60">Create beautiful displays with ease.</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 hover:scale-105 transition duration-300 ease-in-out" radius='md'>
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-full h-full object-cover"
                                src="https://modulabs.co.kr/wp-content/uploads/2023/10/nextjs14-1536x864.png"
                                radius='md'
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-white rounded-b-md">
                                <div className="flex grow gap-2 items-center">
                                    <Image
                                        alt="app icon"
                                        className="rounded-full w-20 bg-black"
                                        src="https://sc.necrozma.xyz/_next/image?url=%2Fyorha-no-2-type-b-1.png&w=256&q=75"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white/60">Modern</p>
                                        <p className="text-white/60">ScoreConnect is built with modern technologies and has a beautiful interface.</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 hover:scale-105 transition duration-300 ease-in-out" radius='md'>
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-full h-full object-cover"
                                src="https://img.freepik.com/premium-photo/abstract-neon-lights-background-colorful-design_910135-4906.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais"
                                radius='md'
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-white rounded-b-md">
                                <div className="flex grow gap-2 items-center">
                                    <Image
                                        alt="app icon"
                                        className="rounded-full w-11 h-11 bg-black"
                                        src="https://sc.necrozma.xyz/_next/image?url=%2Fyorha-no-2-type-b-1.png&w=256&q=75"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white/60">Fast.</p>
                                        <p className="text-white/60">ScoreConnect is fast. Really fast.</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            <Divider />

            <Spacer y={20} />

            <footer className="rounded-t-lg shadow mx-4 bg-gradient-to-r from-[#3E187A] to-[#994ECC]">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm">© 2024 <a href="https://necrozma.xyz" className="hover:underline">ScoreConnect</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                        <li>
                            <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/licensing" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>

    );
}
