import React from 'react';



const TechnologyList: React.FC = () => {
    return (
            <div className="bg-[#454138] rounded-lg shadow-md p-4 w-[80%] mx-auto mt-8">
                <h2 className="text-[#dcd8c0] font-semibold text-xl border-b-[#dcd8c0]">Technologies Used</h2>
                <div className="relative overflow-hidden">
                    <ul className="w-full p-2">
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://nextjs.org/">Next.js</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://firebase.google.com/">Firebase</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://www.typescriptlang.org/">TypeScript</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://reactjs.org/">React</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://hotjar.com/">Hotjar</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://analytics.google.com/">Google Analytics</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://radix-ui.com/">Radix UI</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://firebase.google.com/">Firebase</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out"><a href="https://react-icons.github.io/react-icons/">React Icons</a></li>
                        <li className="text-[#dcd8c0] font-semibold text-sm px-4 py-2 mx-2 bg-[#302d29] rounded-lg mb-2 underline hover:bg-[#bab5a1] hover:text-[#454138] transition duration-200 ease-in-out">...and more!</li>
                    </ul>
                </div>
            </div>
    );
};

export default TechnologyList;
