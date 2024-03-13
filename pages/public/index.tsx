import { User } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { auth } from "../../firebase";

interface Data {
  teamAScore: number;
  teamBScore: number;
  teamAFouls: number;
  teamBFouls: number;
  currentPeriod: number;
  teamAName: string;
  teamBName: string;
}
const Public = () => {
  const router = useRouter();

  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamAFouls, setTeamAFouls] = useState(0);
  const [teamBFouls, setTeamBFouls] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");

  const [userAccount, setUserAccount] = useState<User | null>(null)

  const [ignore, setIgnore] = useState(false);

  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  // const { messages, sendMessage, connectionStatus } = useWebSocket()

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://wss.catgirlsaresexy.org",
    {
      share: true,
      shouldReconnect: () => true,
    },
  )

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAccount(user)
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Get initial data
  useEffect(() => {

    if (ignore) return;

    if (readyState !== ReadyState.OPEN) return;

    if (!userAccount) return;

    console.log("Sending get message")

    const message = {
      action: "get",
      boardId: userAccount?.uid,
    }
    sendMessage(JSON.stringify(message))
    setIgnore(true)
  }, [ignore, userAccount, sendMessage, readyState]);


  useEffect(() => {
    messageHistory.forEach((message) => {
      const messageJson = JSON.parse(message.data) as {
        boardId?: string
        boardData?: string
      }

      console.log(messageJson)

      if (messageJson.boardId && messageJson.boardData) {
        const data = JSON.parse(messageJson.boardData) as Data;

        setTeamAScore(data.teamAScore);
        setTeamBScore(data.teamBScore);
        setTeamAFouls(data.teamAFouls);
        setTeamBFouls(data.teamBFouls);
        setCurrentPeriod(data.currentPeriod);
        setTeamAName(data.teamAName);
        setTeamBName(data.teamBName);
      }
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router, messageHistory]);

  return (
    <>
      <Head>
        <title>ScoreConnect Public Page</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="bg-gray-900 text-white rounded-lg p-4">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-semibold">{teamAName}</h2>
                  <p className="text-xs">Score</p>
                  <p className="text-3xl font-bold">{teamAScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">Fouls</p>
                  <p className="text-3xl font-bold">{teamAFouls}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="text-center">
                <p className="text-6xl font-bold">:</p>
                <p className="text-2xl">Period {currentPeriod}</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-gray-900 text-white rounded-lg p-4">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-semibold">{teamBName}</h2>
                  <p className="text-xs">Score</p>
                  <p className="text-3xl font-bold">{teamBScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">Fouls</p>
                  <p className="text-3xl font-bold">{teamBFouls}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Public;
