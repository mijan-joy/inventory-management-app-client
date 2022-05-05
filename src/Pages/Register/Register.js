import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Register = () => {
    const { register, handleSubmit } = useForm();
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
        await sendEmailVerification();
        await updateProfile({ displayName });
    };
    if (user) {
        console.log("sign up successful", user);
    }
    return (
        <div>
            <h2>Please register</h2>
            <div className="w-1/2 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            className="border border-sky-600 mb-5"
                            type="text"
                            placeholder="name"
                            required
                            {...register("name")}
                        />
                    </div>
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
                        value="Register"
                    />
                </form>
            </div>
            <div>
                <p>
                    Already registered?{" "}
                    <Link className="underline text-blue-600" to="/login">
                        Click here to log in...
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default Register;
