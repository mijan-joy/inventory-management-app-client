import React from "react";
import { Link } from "react-router-dom";

const InventoryItem = ({ item }) => {
    const { _id, name, img, description, price, quantity, supplier } = item;
    return (
        <div className="relative overflow-hidden bg-slate-600/10 rounded-xl">
            <div className="mb-12 p-3">
                <div>
                    <img
                        className="max-w-[250px] w-full mx-auto"
                        src={img}
                        alt=""
                    />
                </div>
                <h2 className="text-xl pb-3">{name}</h2>
                <p>
                    {description.length > 60
                        ? description.slice(0, 60) + "..."
                        : description}
                </p>
                <h4>Price: BDT. {price}</h4>
                <p className={`${quantity < 5 ? "text-red-700" : ""}`}>
                    Quantity: {quantity}
                </p>

                <p>Supplier: {supplier}</p>
            </div>
            <Link
                to={`/inventory/${_id}`}
                className=" bg-teal-400 text-black w-full p-3 bottom-0 absolute text-center font-bold"
            >
                Manage Item
            </Link>
        </div>
    );
};

export default InventoryItem;
