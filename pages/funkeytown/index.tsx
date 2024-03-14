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
import { set } from "lodash"

const Funkly = () => {
    const audioRef = useRef<ReactAudioPlayer | null>(null)
    const [hasPlayed, setHasPlayed] = useState(false)
    const [finished, setFinished] = useState(false)

    /*
    useEffect(() => {
        if (finished) {
            setTimeout(() => {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }, 1000)
        }
    }, [finished])
    */

    const start = () => {
        if (audioRef.current?.audioEl.current) {
            audioRef.current.audioEl.current.play()
        }
        setHasPlayed(true)
    }

    return (
        <div>
            <Head>
                <title>About ScoreConnect</title>
            </Head>

            <div className="absolute bottom-0 right-0 p-2 bg-red-800 w-full h-full overflow-hidden">

                <div className="flex items-center justify-center h-screen w-full text-center italic">


                <pre className="text-white">
                    A spiritu dominatus,
                    <br />
                    Domine, libra nos,
                    <br />
                    From the lightning and the tempest,
                    <br />
                    Our Emperor, deliver us.
                    <br />
                    From plague, temptation and war,
                    <br />
                    Our Emperor, deliver us,
                    <br />
                    From the scourge of the Kraken,
                    <br />
                    Our Emperor, deliver us.
                    <br />
                    <br />
                    From the blasphemy of the Fallen,
                    <br />
                    Our Emperor, deliver us,
                    <br />
                    From the begetting of daemons,
                    <br />
                    Our Emperor, deliver us,
                    <br />
                    From the curse of the mutant,
                    <br />
                    Our Emperor, deliver us,
                    <br />
                    A morte perpetua,
                    <br />
                    Domine, libra nos.
                    <br />
                    That thou wouldst bring them only death,
                    <br />
                    That thou shouldst spare none,
                    <br />
                    That thou shouldst pardon none
                    <br />
                    We beseech thee, destroy them.

                </pre>

                </div>
            </div>

            {!hasPlayed && (
                <>
                    <div className="flex items-center justify-center h-screen w-full">

                        <div
                            id="message"
                            onClick={start}
                            className={`mx-auto p-40 py-60 m-4 rounded-lg text-white shadow-lg bg-gray-500/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer`}
                        >
                            <Image
                                src="/adeptus-mechanicus.svg"
                                width={150}
                                height={150}
                                alt="Me"
                            />
                        </div>

                    </div>
                </>
            )}

            {hasPlayed && !finished && (
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
                            1000,
                            () => setFinished(true)

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
    );
};

export default Funkly;