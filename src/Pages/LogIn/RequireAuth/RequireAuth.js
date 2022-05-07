import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import Loading from "../../Shared/Loading/Loading";

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();
    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate to="/login" state={{ from: location }} replace></Navigate>
        );
    }
    if (
        user.providerData[0]?.providerId === "password" &&
        !user.emailVerified
    ) {
        navigate("/verifyemail");
    }
    return children;
};

export default RequireAuth;
