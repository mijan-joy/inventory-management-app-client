import React from "react";
import { useForm } from "react-hook-form";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";

const ResetPassword = () => {
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(auth);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const reset = async () => {
            await sendPasswordResetEmail(data?.email);
            toast("Reset Email Sent!");
        };
        reset();
    };

    return (
        <div>
            <h2 className="text-center text-xl font-bold">Reset Password:</h2>
            <div className="max-w-[500px] mx-auto py-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 bg-darkbg rounded-md border border-emerald-500"
                >
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Enter your email:
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="Enter quantity to add"
                            autoComplete="off"
                            type="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-rose-600">
                                Please enter email to reset password!
                            </span>
                        )}
                    </div>
                    <p className="text-rose-600 py-1">
                        {error?.message.split("auth/")[1].split(")")[0]}
                    </p>
                    <div className="mb-7">
                        {sending ? (
                            <div className="w-16 h-16 mx-auto">
                                <Loading></Loading>
                            </div>
                        ) : (
                            <input
                                className="w-full bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black tracking-wide"
                                type="submit"
                                value="Reset"
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
