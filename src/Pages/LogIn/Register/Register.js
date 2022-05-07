import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../Shared/Loading/Loading";

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification, sending, verificationError] =
        useSendEmailVerification(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const onSubmit = async (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        handleRegister(email, password, name);
    };
    const handleRegister = async (email, password, displayName) => {
        await createUserWithEmailAndPassword(email, password);
        await sendEmailVerification().then(toast("Verification email sent!"));
        await updateProfile({ displayName });
        signOut(auth);
        navigate("/verifyemail");
    };
    return (
        <div className="container mx-auto py-5">
            <h2 className="text-xl text-center">Please register</h2>
            <div className="max-w-[500px] mx-auto py-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 bg-darkbg rounded-md border border-emerald-500"
                >
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Your Name:
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            type="text"
                            placeholder="name"
                            {...register("name", {
                                minLength: 3,
                                required: true,
                            })}
                        />
                        {errors.name && (
                            <span className="text-rose-600">
                                Minimum 3 letters
                            </span>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Your Email:
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            type="email"
                            placeholder="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-rose-600">
                                Minimum 3 letters
                            </span>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Password (min 6 character):
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            type="password"
                            placeholder="password"
                            {...register("password", {
                                minLength: 6,
                                required: true,
                            })}
                        />
                        {errors.password && (
                            <span className="text-rose-600">
                                Minimum 6 characters
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="w-16 h-16 mx-auto">
                            <Loading></Loading>
                        </div>
                    ) : (
                        <input
                            className="w-full bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black"
                            type="submit"
                            value="Register"
                        />
                    )}

                    <div className="py-3">
                        <p>
                            Already registered?{" "}
                            <Link
                                className="underline text-emerald-400"
                                to="/login"
                            >
                                Click here to log in...
                            </Link>{" "}
                        </p>
                    </div>
                    <SocialLogin></SocialLogin>
                </form>
            </div>
        </div>
    );
};

export default Register;
