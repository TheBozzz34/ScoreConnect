import React from "react"

const TechnologyList: React.FC = () => {
  return (
    <div className="mx-auto mt-8 w-[80%] rounded-lg bg-[#454138] p-4 shadow-md">
      <h2 className="border-b-[#dcd8c0] text-xl font-semibold text-[#dcd8c0]">Technologies Used</h2>
      <div className="relative overflow-hidden">
        <ul className="w-full p-2">
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://nextjs.org/">Next.js</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://tailwindcss.com/">Tailwind CSS</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://firebase.google.com/">Firebase</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://www.typescriptlang.org/">TypeScript</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://reactjs.org/">React</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://hotjar.com/">Hotjar</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://analytics.google.com/">Google Analytics</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://radix-ui.com/">Radix UI</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://firebase.google.com/">Firebase</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            <a href="https://react-icons.github.io/react-icons/">React Icons</a>
          </li>
          <li className="mx-2 mb-2 rounded-lg bg-[#302d29] px-4 py-2 text-sm font-semibold text-[#dcd8c0] underline transition duration-200 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138]">
            ...and more!
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TechnologyList
