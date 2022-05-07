import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const UpdateItem = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        const get = async () => {
            try {
                await axios
                    .get(`http://localhost:5000/inventory/${id}`)
                    .then((response) => {
                        setItem(response.data);
                    });
            } catch (error) {
                setError(error);
            }
        };
        get();
    }, [id]);
    const onSubmit = (data) => {
        data.price = parseInt(data.price);
        data.quantity = parseInt(data.quantity);
        data.sold = parseInt(data.sold);
        const update = async () => {
            await axios
                .put(`http://localhost:5000/inventory/${id}`, data)
                .then((response) => {
                    setItem(data);
                    toast.success("Item information updated.");
                    navigate(`/inventory/${id}`);
                });
        };
        update();
    };

    if (error) {
        return (
            <div className="container mx-auto text-center py-10">
                <p className="text-2xl font-bold text-rose-600">
                    {error?.response.status}
                </p>
                <p className="text-3xl font-bold text-rose-600">
                    {error?.response.statusText}
                </p>
            </div>
        );
    }
    return (
        <div>
            <h2 className="text-2xl font-bold uppercase pt-10 text-center">
                Update Item:
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
                            defaultValue={item?.name}
                            type="text"
                            autoComplete="off"
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
                            defaultValue={item?.img}
                            type="url"
                            autoComplete="off"
                            {...register("img", { required: true })}
                        />
                        {errors.img && (
                            <span className="text-rose-600">
                                URL is required.
                            </span>
                        )}
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
                            defaultValue={item?.description}
                            type="text"
                            autoComplete="off"
                            {...register("description", {
                                minLength: 10,
                                required: true,
                            })}
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
                            defaultValue={item?.price}
                            type="number"
                            autoComplete="off"
                            {...register("price", { min: 0, required: true })}
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
                            defaultValue={item?.quantity}
                            type="number"
                            autoComplete="off"
                            {...register("quantity", {
                                min: 0,
                                required: true,
                            })}
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
                            defaultValue={item?.supplier}
                            type="text"
                            autoComplete="off"
                            {...register("supplier", {
                                minLength: 3,
                                required: true,
                            })}
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
                            type="number"
                            defaultValue={item?.sold}
                            autoComplete="off"
                            {...register("sold", { min: 0 })}
                        />
                        {errors.sold && (
                            <span className="text-rose-600">
                                Quantity can't be less than zero!
                            </span>
                        )}
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
                        value="Update Item"
                    />
                </form>
                <div className="mx-auto py-5">
                    <Link
                        className="w-full bg-rakib-400 hover:bg-emerald-500 px-6 py-3 rounded-md text-black tracking-wide"
                        to={`/inventory/${id}`}
                    >
                        <ArrowLeftIcon className="inline h-4 w-4 text-white"></ArrowLeftIcon>{" "}
                        Back to Item Page
                    </Link>
                </div>
                <div className="mx-auto py-5">
                    <Link
                        className="w-full bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-md text-white tracking-wide mr-5"
                        to="/inventory/manage"
                    >
                        <ArrowLeftIcon className="inline h-4 w-4 text-white"></ArrowLeftIcon>{" "}
                        Back to Inventory
                    </Link>
                    <Link
                        className="w-full bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-md text-white tracking-wide"
                        to="/inventory/myitems"
                    >
                        <ArrowLeftIcon className="inline h-4 w-4 text-white"></ArrowLeftIcon>{" "}
                        Back to My Items
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;
