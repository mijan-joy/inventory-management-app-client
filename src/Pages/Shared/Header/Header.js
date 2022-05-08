import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import auth from "../../../firebase.init";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const handleSignOut = () => {
        signOut(auth);
    };
    const navigate = useNavigate();

    const [time, setTime] = useState("");

    setInterval(() => {
        const today = new Date();
        const time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
        setTime(time);
    }, 1000);

    function CustomLink({ children, to, ...props }) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });

        return (
            <div>
                <Link
                    style={{
                        color: match ? "#00df9a" : "",
                    }}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
            </div>
        );
    }

    return (
        <header className="sticky top-0 shadow-sm shadow-gray-900 z-50">
            <div className=" bg-greyblack text-white">
                <p className=" container mx-auto text-xs font-mono">
                    <span className="mr-4 hidden sm:inline">
                        PS Warehouse Management System V.1.0.0{" "}
                    </span>{" "}
                    {user && (
                        <span className="mr-4">User: {user.displayName}</span>
                    )}
                    <span>{time}</span>
                </p>
            </div>
            <div className="bg-black text-white ">
                <div className="container mx-auto flex items-center justify-between py-3">
                    <div className="flex items-center">
                        <div
                            onClick={() => {
                                setOpen(!open);
                            }}
                            className="w-10 h-10 md:hidden mr-2"
                        >
                            {open ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
                        </div>
                        <div>
                            <h2
                                onClick={() => navigate("/home")}
                                className="text-center text-xl text-rakib-400 hover:text-emerald-300 mx-auto z-50 cursor-pointer"
                            >
                                Printing Solution
                            </h2>
                        </div>
                    </div>
                    <div>
                        <nav
                            className={`bg-black text-white md:flex items-center absolute md:static duration-200 w-full ease-in ${
                                open
                                    ? "top-20 left-[0px]"
                                    : "top-[-250px] left-[0px]"
                            }`}
                        >
                            <CustomLink
                                className="block p-2 mr-2 hover:text-rakib-400"
                                to="/home"
                            >
                                Home
                            </CustomLink>
                            {user && (
                                <CustomLink
                                    className="block p-2 mr-2 hover:text-rakib-400"
                                    to="/inventory/manage"
                                >
                                    Manage Items
                                </CustomLink>
                            )}
                            {user && (
                                <CustomLink
                                    className="block p-2 mr-2 hover:text-rakib-400"
                                    to="/inventory/myitems"
                                >
                                    My Items
                                </CustomLink>
                            )}
                            {user && (
                                <CustomLink
                                    className="block p-2 mr-2 hover:text-rakib-400"
                                    to="/inventory/manage/add"
                                >
                                    Add Item
                                </CustomLink>
                            )}
                            {user ? (
                                <CustomLink
                                    onClick={handleSignOut}
                                    className="block px-4 mr-2 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white md:rounded"
                                    to="/login"
                                >
                                    Sign Out
                                </CustomLink>
                            ) : (
                                <CustomLink
                                    className="block px-4 py-2 mr-2  bg-white text-black md:rounded"
                                    to="/login"
                                >
                                    Log In
                                </CustomLink>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
            {/* <nav className="p-3">
                <Link
                    className="ml-4 py-2 px-4 border border-sky-800"
                    to="/home"
                >
                    Home
                </Link>
                {user && (
                    <Link
                        className="ml-4 py-2 px-4 border border-sky-800"
                        to="/inventory/manage"
                    >
                        Manage Item
                    </Link>
                )}
                {user && (
                    <Link
                        className="ml-4 py-2 px-4 border border-sky-800"
                        to="/inventory/myitems"
                    >
                        My Items
                    </Link>
                )}
                {user && (
                    <Link
                        className="ml-4 py-2 px-4 border border-sky-800"
                        to="/inventory/manage/add"
                    >
                        Add Item
                    </Link>
                )}
                {user ? (
                    <Link
                        onClick={handleSignOut}
                        className="ml-4 py-2 px-4 border border-sky-800"
                        to="/login"
                    >
                        Sign Out
                    </Link>
                ) : (
                    <Link
                        className="ml-4 py-2 px-4 border border-sky-800"
                        to="/login"
                    >
                        Log In
                    </Link>
                )}
            </nav> */}
        </header>
    );
};

export default Header;
