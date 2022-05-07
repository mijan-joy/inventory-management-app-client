import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    useAuthState,
    useSendEmailVerification,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";

const VerifyEmail = () => {
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (
            user?.providerData[0]?.providerId === "password" &&
            user?.emailVerified
        ) {
            navigate(from, { replace: true });
            toast.success("Signed In Successfully.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }, [from, user, navigate]);
    return (
        <div className="container mx-auto text-center py-10">
            <h2 className="text-xl text-rose-600 font-bold pb-5">
                Email is not verified!
            </h2>
            <h2>Please check your email inbox & verify</h2>
            <p className="py-3">
                Already verified?{" "}
                <button
                    onClick={() => window.location.reload(false)}
                    className="bg-rakib-400 hover:bg-teal-500 px-5 py-2 rounded-md text-black"
                >
                    Refresh
                </button>{" "}
            </p>
            <h2 className="text-xl text-rose-600 font-bold py-2">
                Didn't receive the email?
            </h2>
            {sending ? (
                <div className="w-24 h-24 mx-auto">
                    <Loading></Loading>
                </div>
            ) : (
                <button
                    className="bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black"
                    onClick={async () => {
                        await sendEmailVerification().then(toast("Sent email"));
                    }}
                >
                    Send Verification Email Again
                </button>
            )}
        </div>
    );
};

export default VerifyEmail;
