import React from 'react';

const Footer = () => {
    return (
        <div >
            <footer className="bg-[#454138] rounded-lg shadow m-4 text-[#dcd8c0] absolute bottom-0 right-0">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>

            <footer className="bg-[#454138] rounded-lg shadow m-4 text-[#dcd8c0] absolute bottom-0 left-0">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                        <li>
                            <a className="underline" href="https://metakirby5.github.io/yorha/">Theme</a> by <a href="https://github.com/metakirby5" className="underline">metakirby5</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>

    );
};

export default Footer;
