import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="bg-black text-white py-10 text-center mt-14">
            <p className="uppercase text-rakib-400 tracking-widest">
                Cloud data based inventory management system
            </p>
            <h2 className="font-bold text-3xl md:text-6xl pt-7">
                Real time updates
            </h2>
            <h2 className="font-bold text-2xl md:text-5xl pt-3">
                Deliver, restock, manage. Simple!
            </h2>
            <p className="text-gray-400 font-semibold text-lg md:text-xl pt-7 tracking-wide mb-5">
                Switch to the new system of flexibility, usability &amp;
                efficiency
            </p>
            <div className="pt-10 text-center">
                <Link
                    to="/"
                    className="inline-block bg-rakib-400 hover:bg-emerald-500 active:bg-emerald-700 px-6 py-3 rounded-sm text-black mx-2 mb-3"
                >
                    Read the Docs
                </Link>
                <Link
                    to="/inventory/manage"
                    className="inline-block mx-2 bg-teal-400 hover:bg-teal-500 active:bg-teal-700 px-6 py-3 rounded-sm text-black"
                >
                    Go to Inventory
                </Link>
            </div>
        </div>
    );
};

export default Banner;
