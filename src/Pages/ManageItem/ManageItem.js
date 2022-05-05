import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ManageItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(0);

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
                    .post(`http://localhost:5000/inventory/${id}`, {
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
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const update = async () => {
            await axios
                .post(`http://localhost:5000/inventory/${id}`, {
                    quantity: item.quantity + parseInt(data.quantity),
                })
                .then((response) => {
                    console.log(response);
                    setQuantity(item.quantity);
                });
        };
        update();
    };
    return (
        <div>
            <img src={item?.img} alt="" />
            <h2>Name: {item?.name}</h2>
            <p>id: {item?._id}</p>
            <p>Sold: {item?.sold}</p>
            <p>Quantity: {item?.quantity}</p>
            <p>description: {item?.description}</p>
            <p>price: {item?.price}</p>
            <p>supplier: {item?.supplier}</p>
            <button
                onClick={() => {
                    handleDeliveryBtn(item?._id);
                    toast("delivered!");
                }}
                className="rounded-full bg-sky-600 text-white px-4"
            >
                Delivered
            </button>
            <div className="border p-4 border-black">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Quantity</label>
                    <input
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Enter quantity to add"
                        required
                        type="number"
                        {...register("quantity", { min: 1 })}
                    />

                    <input
                        className="rounded-full bg-sky-600 text-white px-4"
                        type="Restock"
                    />
                </form>
            </div>
        </div>
    );
};

export default ManageItem;
