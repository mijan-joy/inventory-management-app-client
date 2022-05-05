import React from "react";
import { useNavigate } from "react-router-dom";

const InventoryItem = ({ item }) => {
    const { _id, name, img, description, price, quantity, supplier } = item;
    const navigate = useNavigate();
    const handleManageBtn = (id) => {
        navigate(`/inventory/${id}`);
    };
    return (
        <div className="p-2 border-emerald-500 border">
            <div>
                <img src={img} alt="" />
            </div>
            <h2>{name}</h2>
            <h4>Price: {price}</h4>
            <p>Quantity: {quantity}</p>
            <p>{description}</p>
            <p>Supplier: {supplier}</p>
            <button
                onClick={() => {
                    handleManageBtn(_id);
                }}
                className="border border-b-slate-600 bg-black text-white p-2 rounded-sm"
            >
                Manage Item
            </button>
        </div>
    );
};

export default InventoryItem;
