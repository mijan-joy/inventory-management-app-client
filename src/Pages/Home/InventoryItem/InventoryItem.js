import React from "react";

const InventoryItem = ({ item }) => {
    const { name, img, description, price, quantity, supplier } = item;
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
            <button className="border border-b-slate-600 bg-black text-white p-2 rounded-sm">
                Manage Item
            </button>
        </div>
    );
};

export default InventoryItem;
