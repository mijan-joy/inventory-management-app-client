import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import axios from "axios";

const LogIn = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        handleSignIn(email, password);
    };
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const handleSignIn = async (email, password) => {
        await signInWithEmailAndPassword(email, password);
        const { data } = await axios.post(`http://localhost:5000/login`, {
            email,
        });
        localStorage.setItem("authToken", data.authToken);
    };
    useEffect(() => {
        if (user) {
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
        <div>
            <h2>Please log in to continue</h2>
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            className="border border-sky-600 mb-5"
                            type="email"
                            placeholder="email"
                            required
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <input
                            className="border border-sky-600 mb-5"
                            type="password"
                            placeholder="password"
                            required
                            {...register("password")}
                        />
                    </div>

                    <input
                        className="rounded-pill bg-sky-700 text-white"
                        type="submit"
                        value="Log In"
                    />
                </form>
            </div>
            <div>
                <p>
                    Not registered?{" "}
                    <Link className="underline text-blue-600" to="/register">
                        Click here to register...
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default LogIn;
