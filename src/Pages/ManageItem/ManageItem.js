import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ManageItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const get = async () => {
            await axios
                .get(`http://localhost:5000/inventory/${id}`)
                .then((response) => {
                    setItem(response.data);
                });
        };
        get();
    }, [id, quantity]);
    const handleDeliveryBtn = (id) => {
        if (item.quantity > 0) {
            const update = async () => {
                await axios
                    .put(`http://localhost:5000/inventory/${id}`, {
                        quantity: item?.quantity - 1,
                        sold: item?.sold + 1,
                    })
                    .then((response) => {
                        console.log(response);
                        setQuantity(item.quantity);
                    });
            };
            update();
        }
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const update = async () => {
            await axios
                .put(`http://localhost:5000/inventory/${id}`, {
                    quantity: item.quantity + parseInt(data.quantity),
                })
                .then((response) => {
                    console.log(response);
                    setQuantity(item.quantity);
                });
        };
        update();
    };
    const handleManageInventoryBtn = () => {
        navigate("/inventory/manage");
    };
    return (
        <div className="container mx-auto">
            <div className="md:flex items-center justify-evenly">
                <div>
                    <img
                        className="max-w-[300px] mx-auto w-full"
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
                                toast("delivered!");
                            }}
                            className="bg-orange-600 hover:bg-orange-500 px-5 py-3 rounded-sm text-black"
                        >
                            Delivered
                        </button>
                        <button className=" bg-rakib-400 hover:bg-emerald-500 px-5 py-3 rounded-sm text-black">
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
                            className="w-full bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black tracking-wide"
                            type="submit"
                            value="Restock"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleManageInventoryBtn}
                            className="w-full bg-teal-400 hover:bg-emerald-500 px-5 py-2 rounded-md text-black tracking-wide"
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
