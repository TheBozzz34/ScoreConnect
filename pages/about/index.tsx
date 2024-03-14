import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { SetStateAction, useEffect, useState } from "react"
import { useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Me from "components/Me/me"
import TechnologyList from "components/ScrollingList/TechnologyList"
import { useIsMobile } from "utils/useIsMobile"
import { auth } from "../../firebase"
import superCoolImage from "../../public/ws1q2v359xl31.png"
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  const isMobile = useIsMobile()
  const [clientVersion, setClientVersion] = useState("")
  const [user, setUser] = useState<SetStateAction<any>>(null)
  const router = useRouter()

  const audioRef = useRef<ReactAudioPlayer | null>(null)

  const [hasPlayed, setHasPlayed] = useState(false)

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
  }, [user])

  return (
    <div>
      <Head>
        <title>About ScoreConnect</title>
      </Head>

      {isMobile ? (
        <div>
          <Me />
          <div className="rounded-lg p-4">
            <h2 className="border-b text-xl font-semibold text-white">About ScoreConnect</h2>
            <div className="relative overflow-hidden">
              <p className="m-2 rounded-lg px-4 py-2 text-sm font-semibold text-white">
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
                for DNS and CDN. These services cost money, so if you would like to help out, please consider donating
                on{" "}
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
        <div className="inline-flex h-full w-full items-center justify-center">
          <Me />
          <div className="w-[40%] rounded-lg p-4">
            <div className="mx-auto mt-8 w-[95%] rounded-lg bg-[#454138] p-4 glass">
              <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">About ScoreConnect</h2>
            </div>
            <div className="inline-flex">
              <div className="mx-auto mr-4 mt-8 w-[40%] rounded-lg bg-gray-500/20 backdrop-blur-sm p-4">
                <h2 className="border-b-white text-xl font-semibold text-white">Development</h2>
                <div className="relative overflow-hidden">
                  <p className="m-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gray-500/40">
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
                  <p className="mx-2 mb-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gray-500/40">
                    ScoreConnect is hosted on{" "}
                    <a href="https://www.digitalocean.com/" className="underline">
                      DigitalOcean
                    </a>
                    , and uses{" "}
                    <a href="https://www.cloudflare.com/" className="underline">
                      Cloudflare
                    </a>{" "}
                    for DNS and CDN. These services cost money, so if you would like to help out, please consider
                    donating on{" "}
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
              <div className="mx-auto mt-8 w-[40%] rounded-lg bg-gray-500/20 backdrop-blur-sm p-4 shadow-md">
                <h2 className="border-b-white text-xl font-semibold text-white">Version Information</h2>
                <div className="relative overflow-hidden">
                  <p className="m-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gray-500/40">
                    Version: 1.0.0
                  </p>
                  <p className="mx-2 mb-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gray-500/40">
                    Client Version: <span className="text-xs">{clientVersion}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*<TechnologyList />*/}
      <div className="mb-8"></div>

      <div
        id="message"
        className={`fixed bottom-0 right-0 p-4 m-4 rounded-lg text-white transition ease-in-out delay-150 ${hasPlayed ? "hidden" : "animate-bounce hover:cursor-pointer"}`}
        onClick={() => {
          if (audioRef.current?.audioEl.current) {
            setHasPlayed(true)
            audioRef.current.audioEl.current.play()
          }
        }}
      >
        <Image
          src="/maxresdefault.jpg"
          width={150}
          height={150}
          className="mx-auto mt-4 rounded-full border-2"
          alt="Me"
        />

        <span
          className="text-xs"
        >
          Message from the Omnissiah
        </span>

      </div>


      {hasPlayed && (
        <>
          <Image
            src={superCoolImage}
            className="absolute bottom-0 right-0"
            quality={100}
            alt="Me"
          />

          <TypeAnimation
            sequence={[
              2000,
              'From the moment I understood the weakness of my flesh, it disgusted me',
              1000,
              'I craved the strength and certainty of steel',
              1000,
              'I aspired to the purity of the Blessed Machine.',
              1000,
              'Your kind cling to your flesh, as if it will not decay and fail you.',
              1000,
              'One day the crude biomass you call a temple will wither, and you will beg my kind to save you.',
              1500,
              'But I am already saved',
              1000,
              'For the Machine is immortal',
              3000,
              '...even in death I serve the Omnissiah.',
            ]}
            speed={50}
            style={{ fontSize: '2em', color: '#8B0000', position: 'absolute', bottom: 0, right: 0, padding: '1em' }}
            className="border-b-2 border-red-800"
          />
        </>
      )}

      <ReactAudioPlayer
        src="/message.mp3"
        autoPlay
        ref={(element) => { audioRef.current = element; }}
      />

    </div>
  )
}
export default About
