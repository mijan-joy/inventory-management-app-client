import React from "react";
import logo from "../../../img/logo/ps.png";

const Footer = () => {
    return (
        <footer className="border-t border-white py-10">
            <div className="container text-center sm:text-left mx-auto sm:grid sm:grid-cols-3 gap-10 items-center">
                <div className="mb-5 sm:mb-0">
                    <img
                        className="max-w-[250px] mx-auto w-full"
                        src={logo}
                        alt=""
                    />
                </div>
                <div className="mb-7 sm:mb-0">
                    <h2 className="text-2xl pb-3">Useful Links:</h2>
                    <button
                        to="/nowhere"
                        className="block py-2 hover:underline mx-auto md:mx-0"
                    >
                        Docs
                    </button>
                    <button
                        to="/"
                        className="block py-2 hover:underline mx-auto md:mx-0"
                    >
                        Terms & Condition
                    </button>
                    <button
                        to="/"
                        className="block py-2 hover:underline mx-auto md:mx-0"
                    >
                        Usage Policies
                    </button>
                </div>
                <div className="mb-7 sm:mb-0">
                    <h2 className="text-2xl pb-3">Company</h2>
                    <button className="block py-2 hover:underline mx-auto md:mx-0">
                        About
                    </button>
                    <button className="block py-2 hover:underline mx-auto md:mx-0">
                        Career
                    </button>
                    <button
                        to="/"
                        className="block py-2 hover:underline mx-auto md:mx-0"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
