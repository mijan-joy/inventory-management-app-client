import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import axios from "axios";
import SocialLogin from "./SocialLogin/SocialLogin";

const LogIn = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
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
        <div className="container mx-auto">
            <div className="max-w-[500px] mx-auto py-5">
                <form
                    className="p-5 bg-darkbg rounded-md border border-emerald-500"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Email:
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-rose-600">
                                Please enter your email
                            </span>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Password:
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            type="password"
                            placeholder="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-rose-600">
                                Please enter your password
                            </span>
                        )}
                    </div>
                    <p className="text-rose-600 py-1">
                        {error?.message.split("auth/")[1].split(")")[0]}
                    </p>
                    <input
                        className="w-full bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black"
                        type="submit"
                        value="Log In"
                    />
                    <div className="mt-5">
                        <p>
                            Not registered?{" "}
                            <Link
                                className="underline text-emerald-400"
                                to="/register"
                            >
                                Click here to register...
                            </Link>{" "}
                        </p>
                    </div>
                    <div className="mt-5">
                        <p>
                            Forgot Password?{" "}
                            <Link
                                className="underline text-emerald-400"
                                to="/resetpassword"
                            >
                                Reset Now...
                            </Link>{" "}
                        </p>
                    </div>
                    <SocialLogin></SocialLogin>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
