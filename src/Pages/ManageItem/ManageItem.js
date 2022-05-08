import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading/Loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ManageItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        const get = async () => {
            try {
                await axios
                    .get(`https://ps-wms-server.herokuapp.com/inventory/${id}`)
                    .then((response) => {
                        setItem(response.data);
                    });
            } catch (error) {
                setError(error);
            }
        };
        get();
    }, [id, quantity]);

    const handleDeliveryBtn = (id) => {
        if (item.quantity <= 0) {
            toast.error("Item is stocked out!");
        } else {
            confirmAlert({
                title: "Confirm to Delete",
                message: "Are you sure to do this?",
                buttons: [
                    {
                        label: "Yes",
                        onClick: async () => {
                            await axios
                                .put(
                                    `https://ps-wms-server.herokuapp.com/inventory/${id}`,
                                    {
                                        quantity: item?.quantity - 1,
                                        sold: item?.sold + 1,
                                    }
                                )
                                .then((response) => {
                                    setQuantity(item.quantity);
                                    toast.success("Item Delivered", {
                                        position: "top-center",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                });
                        },
                    },
                    {
                        label: "No",
                        onClick: () => {},
                    },
                ],
            });
        }
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const onSubmit = (data) => {
        const update = async () => {
            await axios
                .put(`https://ps-wms-server.herokuapp.com/inventory/${id}`, {
                    quantity: item.quantity + parseInt(data.quantity),
                })
                .then((response) => {
                    setQuantity(item.quantity);
                    toast.success("Quantity added!");
                });
        };
        update();
        reset();
    };
    const handleManageInventoryBtn = () => {
        navigate("/inventory/manage");
    };
    const handleUpdateBtn = (id) => {
        navigate(`/inventory/update/${id}`);
    };
    if (!item) {
        return (
            <div className="mx-auto w-48 h-48">
                <Loading></Loading>
            </div>
        );
    }
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
        <div className="container mx-auto py-5">
            <div className="md:flex items-center justify-center gap-10">
                <div className="p-3 bg-darkbg/50 rounded-xl mb-3">
                    <img
                        className="max-w-[220px] max-h-[280px] rounded-xl w-full mx-auto"
                        src={item?.img}
                        alt=""
                    />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-xl">Name: {item?.name}</h2>
                    <p>id: {item?._id}</p>
                    <p>Sold: {item?.sold}</p>
                    <p>Quantity: {item?.quantity}</p>
                    <p>description: {item?.description}</p>
                    <p>price: {item?.price}</p>
                    <p className="pb-3">supplier: {item?.supplier}</p>
                    <div className="flex gap-5">
                        <button
                            onClick={() => {
                                handleDeliveryBtn(item?._id);
                            }}
                            className="bg-orange-600 hover:bg-orange-500 active:bg-orange-700 px-5 py-3 rounded-sm text-white"
                        >
                            Delivered
                        </button>
                        <button
                            onClick={() => {
                                handleUpdateBtn(item?._id);
                            }}
                            className=" bg-rakib-400 hover:bg-emerald-300 active:bg-emerald-600 px-5 py-3 rounded-sm text-black"
                        >
                            Update Information
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[500px] mx-auto py-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 bg-darkbg rounded-md border border-emerald-500"
                >
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Add quantity to current item:
                        </label>
                        <input
                            className="border   text-sm rounded-md focus:ring-teal-500  block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white  border-teal-500"
                            placeholder="Enter quantity to add"
                            required
                            type="number"
                            {...register("quantity", { min: 1 })}
                        />
                        {errors.quantity && (
                            <span className="text-rose-600">
                                Restock quantity has to be at least one!
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <input
                            className="w-full bg-emerald-500 hover:bg-rakib-400 active:bg-emerald-600 px-5 py-2 rounded-md text-black tracking-wide"
                            type="submit"
                            value="Restock"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleManageInventoryBtn}
                            className="w-full bg-teal-500 hover:bg-teal-400 active:bg-teal-600 px-5 py-2 rounded-md text-black tracking-wide"
                        >
                            Manage Inventory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageItem;
