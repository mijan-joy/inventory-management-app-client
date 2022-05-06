import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const AddItem = () => {
    const [user] = useAuthState(auth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        data.quantity = parseInt(data.quantity);
        data.price = parseInt(data.price);
        data.sold = parseInt(data.sold);
        const post = async () => {
            await axios
                .post("http://localhost:5000/inventory/manage/add", data)
                .then((response) => console.log(response));
        };
        post();
    };
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold uppercase pt-10 text-center">
                Add new item:
            </h2>
            <div className="max-w-[500px] mx-auto py-5">
                <form
                    className="p-5 bg-darkbg rounded-md border border-emerald-500"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-7">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Item Name:
                        </label>
                        <input
                            id="name"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="eg: Pump for M825HI"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("name", { minLength: 3 })}
                        />
                        {errors.name && (
                            <span className="text-rose-600">
                                Minimum 3 letters
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="img"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Image URL:
                        </label>
                        <input
                            id="img"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="eg: https://i.ibb.co/fnkyFJg/btmark.png"
                            required
                            type="url"
                            autoComplete="off"
                            {...register("img")}
                        />
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Short Description:
                        </label>
                        <textarea
                            id="description"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="Item description here"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("description", { minLength: 10 })}
                        />
                        {errors.description && (
                            <span className="text-rose-600">
                                Description at least 10 letters
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Item Price:
                        </label>
                        <input
                            id="price"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="Item price"
                            required
                            type="number"
                            autoComplete="off"
                            {...register("price", { min: 0 })}
                        />
                        {errors.price && (
                            <span className="text-rose-600">
                                Price can't be less than zero!
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Initial quantity:
                        </label>
                        <input
                            id="quantity"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="Opening quantity here"
                            required
                            type="number"
                            autoComplete="off"
                            {...register("quantity", { min: 0 })}
                        />
                        {errors.quantity && (
                            <span className="text-rose-600">
                                Quantity can't be less than zero!
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="supplier"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Supplier:
                        </label>
                        <input
                            id="supplier"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="eg: BTMARK"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("supplier", { minLength: 3 })}
                        />
                        {errors.supplier && (
                            <span className="text-rose-600">
                                Minimum 3 letters
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="sold"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Sold Quantity:{" "}
                            <span className="text-xs">
                                Initial value should be 0
                            </span>
                        </label>
                        <input
                            id="sold"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            required
                            type="number"
                            value="0"
                            autoComplete="off"
                            {...register("sold")}
                        />
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Authorized Email:
                        </label>
                        <input
                            id="email"
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            defaultValue={user?.email}
                            autoComplete="off"
                            readOnly
                            {...register("email")}
                        />
                    </div>

                    <input
                        className="w-full bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black tracking-wide"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddItem;
