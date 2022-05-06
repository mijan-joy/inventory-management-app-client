import React from "react";

const Banner = () => {
    return (
        <div className="bg-black text-white py-10 text-center mt-14">
            <p className="uppercase text-rakib-400 tracking-widest">
                User based inventory management system
            </p>
            <h2 className="font-bold text-6xl pt-7">Real time updates</h2>
            <h2 className="font-bold text-5xl pt-3 animate-pulse">
                Deliver, restock, manage. Simple!
            </h2>
            <p className="text-gray-400 font-semibold text-xl pt-7 tracking-wide mb-5">
                Switch to the new system of flexibility, usability &amp;
                efficiency
            </p>
            <div className="pt-10">
                <button className="bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-sm text-black mr-5">
                    Read the Docs
                </button>
                <button className="bg-teal-400 hover:bg-teal-500 px-5 py-2 rounded-sm text-black">
                    Go to Inventory
                </button>
            </div>
        </div>
    );
};

export default Banner;
