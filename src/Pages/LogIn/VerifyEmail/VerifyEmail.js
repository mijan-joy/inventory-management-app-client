import React from "react";
import { Link } from "react-router-dom";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const [sendEmailVerification, sending, error] =
        useSendEmailVerification(auth);
    return (
        <div className="container mx-auto text-center py-10">
            <h2 className="text-xl text-rose-600 font-bold pb-5">
                Email is not verified!
            </h2>
            <h2>Please check your email inbox & verify</h2>
            <p className="py-3">
                Already verified?{" "}
                <Link
                    to="/login"
                    className="bg-rakib-400 hover:bg-teal-500 px-5 py-2 rounded-md text-black"
                >
                    Log in again
                </Link>{" "}
            </p>
            <h2 className="text-xl text-rose-600 font-bold py-2">
                Didn't receive the email?
            </h2>
            <button
                className="bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black"
                onClick={async () => {
                    await sendEmailVerification().then(toast("Sent email"));
                }}
            >
                Send Verification Email Again
            </button>
        </div>
    );
};

export default VerifyEmail;
