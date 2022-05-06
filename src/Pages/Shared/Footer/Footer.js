import React from "react";
import { Link } from "react-router-dom";
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
                    <Link to="/" className="block py-2">
                        Docs
                    </Link>
                    <Link to="/" className="block py-2">
                        Terms & Condition
                    </Link>
                    <Link to="/" className="block py-2">
                        Usage Policies
                    </Link>
                </div>
                <div className="mb-7 sm:mb-0">
                    <h2 className="text-2xl pb-3">Company</h2>
                    <Link to="/" className="block py-2">
                        About
                    </Link>
                    <Link to="/" className="block py-2">
                        Career
                    </Link>
                    <Link to="/" className="block py-2">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
