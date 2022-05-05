import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="p-3">
                <Link
                    className="ml-4 py-2 px-4 border border-sky-800"
                    to="/home"
                >
                    Home
                </Link>
                <Link
                    className="ml-4 py-2 px-4 border border-sky-800"
                    to="/inventory/manage"
                >
                    Manage Item
                </Link>
                <Link
                    className="ml-4 py-2 px-4 border border-sky-800"
                    to="/inventory/manage/add"
                >
                    Add Item
                </Link>
                <Link
                    className="ml-4 py-2 px-4 border border-sky-800"
                    to="/login"
                >
                    Log In
                </Link>
            </nav>
        </header>
    );
};

export default Header;
