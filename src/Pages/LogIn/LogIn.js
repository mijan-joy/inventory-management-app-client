import React from "react";
import { useForm } from "react-hook-form";

const LogIn = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
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
        </div>
    );
};

export default LogIn;
