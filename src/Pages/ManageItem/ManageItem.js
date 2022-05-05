import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
        </div>
    );
};

export default ManageItem;
