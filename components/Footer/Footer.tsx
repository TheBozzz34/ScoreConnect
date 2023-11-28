import { GetServerSidePropsContext } from "next"
import React from "react"
import { getIsSsrMobile } from "../../utils/getIsSsrMobile"
import { useIsMobile } from "../../utils/useIsMobile"

const Footer = () => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <footer className="sticky bottom-1 z-[100] m-4 rounded-lg bg-[#454138] text-[#dcd8c0] shadow">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center text-sm font-medium sm:mt-0">
            <li>
              <a className="underline" href="https://metakirby5.github.io/yorha/">
                Theme
              </a>{" "}
              by{" "}
              <a href="https://github.com/metakirby5" className="me-4 underline md:me-6">
                metakirby5
              </a>
            </li>
            <li>
              <a href="/about" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/404" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  } else {
    return (
      <div>
        <footer className="fixed bottom-0 right-0 z-[100] m-4 w-fit rounded-lg bg-[#454138] text-[#dcd8c0] shadow border-2 border-[#dcd8c0]">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <ul className="mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0">
              <li>
                <a href="/about" className="me-4 hover:underline md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="/404" className="me-4 hover:underline md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/404" className="me-4 hover:underline md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="mailto:necrozma@catgirlsaresexy.org" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>

        <footer className="fixed bottom-0 m-4 w-fit rounded-lg bg-[#454138] text-[#dcd8c0] shadow border-2 border-[#dcd8c0]">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <ul className="mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0">
              <li>
                <a className="underline" href="https://metakirby5.github.io/yorha/">
                  Theme
                </a>{" "}
                by{" "}
                <a href="https://github.com/metakirby5" className="underline">
                  metakirby5
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context),
    },
  }
}
