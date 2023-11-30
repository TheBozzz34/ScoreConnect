import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { SetStateAction, useEffect, useState } from "react"
import Me from "components/Me/me"
import TechnologyList from "components/ScrollingList/TechnologyList"
import { useIsMobile } from "utils/useIsMobile"
import { auth } from "../../firebase"

const About = () => {
    const isMobile = useIsMobile()
    const [clientVersion, setClientVersion] = useState("")
    const [user, setUser] = useState<SetStateAction<any>>(null)
    const router = useRouter()

    useEffect(() => {
        if (user) {
            console.log("user", user)
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setUser(null)
            } else {
                setUser(user)
            }
        })

        return () => unsubscribe() // Cleanup the listener on unmount
    }, [router, user])



    useEffect(() => {
        if (user !== null) {
            setClientVersion(user.auth.clientVersion)
        } else {
            setClientVersion("Unknown")
        }
    }
        , [user])

    return (
        <div>
            <Head>
                <title>About ScoreConnect</title>
            </Head>

            {isMobile ? (
                <div>
                    <Me />
                    <div className="mt-8 w-[80%] rounded-lg bg-[#454138] p-4 shadow-md mx-auto">
                        <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">About ScoreConnect</h2>
                        <div className="relative overflow-hidden">
                            <p className="m-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0]">
                                This website was created by{" "}
                                <a href="https://necrozma.xyz/" className="underline">
                                    Necrozma
                                </a>
                                , it is open source and can be found on{" "}
                                <a href="https://github.com/thebozzz34/ScoreConnect" className="underline">
                                    GitHub
                                </a>
                                .
                            </p>
                            <p className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0]">
                                ScoreConnect is hosted on{" "}
                                <a href="https://www.digitalocean.com/" className="underline">
                                    DigitalOcean
                                </a>
                                , and uses{" "}
                                <a href="https://www.cloudflare.com/" className="underline">
                                    Cloudflare
                                </a>{" "}
                                for DNS and CDN. These services cost money, so if you would like to help out, please consider donating on{" "}
                                <a href="https://www.paypal.me/EthanJames1472" className="underline">
                                    PayPal
                                </a>{" "}
                                or{" "}
                                <a href="https://www.buymeacoffee.com/keturah" className="underline">
                                    Buy Me a Coffee
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="inline-flex items-center justify-center w-full h-full">
                    <Me />
                    <div className="w-[40%] rounded-lg p-4 shadow-md">
                        <div className="mt-8 w-[95%] rounded-lg bg-[#454138] p-4 shadow-md mx-auto">
                            <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">About ScoreConnect</h2>
                        </div>
                        <div className="inline-flex">
                            <div className="mt-8 w-[40%] rounded-lg bg-[#454138] p-4 shadow-md mr-4 mx-auto">
                                <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">Development</h2>
                                <div className="relative overflow-hidden">
                                    <p className="m-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0]">
                                        This website was created by{" "}
                                        <a href="https://necrozma.xyz/" className="underline">
                                            Necrozma
                                        </a>
                                        , it is open source and can be found on{" "}
                                        <a href="https://github.com/thebozzz34/ScoreConnect" className="underline">
                                            GitHub
                                        </a>
                                        .
                                    </p>
                                    <p className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0]">
                                        ScoreConnect is hosted on{" "}
                                        <a href="https://www.digitalocean.com/" className="underline">
                                            DigitalOcean
                                        </a>
                                        , and uses{" "}
                                        <a href="https://www.cloudflare.com/" className="underline">
                                            Cloudflare
                                        </a>{" "}
                                        for DNS and CDN. These services cost money, so if you would like to help out, please consider donating on{" "}
                                        <a href="https://www.paypal.me/EthanJames1472" className="underline">
                                            PayPal
                                        </a>{" "}
                                        or{" "}
                                        <a href="https://www.buymeacoffee.com/keturah" className="underline">
                                            Buy Me a Coffee
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 w-[40%] rounded-lg bg-[#454138] p-4 shadow-md mx-auto">
                                <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">Version Information</h2>
                                <div className="relative overflow-hidden">
                                    <p className="m-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0]">
                                        Version: 1.0.0
                                    </p>
                                    <p className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0]">
                                        Client Version: <span className="text-xs">{clientVersion}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            <TechnologyList />
            <div className="mb-8"></div>
        </div>
    )
}
export default About
