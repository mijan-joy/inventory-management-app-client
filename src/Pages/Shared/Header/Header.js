import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    };
    return (
        <header>
            <nav className="p-3">
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
            </nav>
        </header>
    );
};

export default Header;
