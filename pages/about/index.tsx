import React from "react"
import NavBar from "components/Navbar/Navbar"
import TechnologyList from "components/ScrollingList/TechnologyList"

const about = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-auto mt-8 w-[80%] rounded-lg bg-[#454138] p-4 shadow-md">
        <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">About</h2>
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
      <TechnologyList />
    </div>
  )
}
export default about
