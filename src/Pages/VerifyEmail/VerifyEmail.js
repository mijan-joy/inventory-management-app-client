import React from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    return (
        <div>
            <h2>Please check your email inbox & verify</h2>
            <p>
                Already verified?{" "}
                <Link to="/login" className="underline text-blue-700">
                    Log in again
                </Link>{" "}
            </p>
        </div>
    );
};

export default VerifyEmail;
