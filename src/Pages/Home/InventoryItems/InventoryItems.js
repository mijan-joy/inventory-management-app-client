import axios from "axios";
import React, { useEffect, useState } from "react";
import InventoryItem from "../InventoryItem/InventoryItem";

const InventoryItems = () => {
    const [items, setItems] = useState([]);
    const [displayItemCount, setDisplayItemCount] = useState(6);
    useEffect(() => {
        const get = async () => {
            await axios
                .get(`http://localhost:5000/items?display=${displayItemCount}`)
                .then((response) => {
                    setItems(response.data);
                });
        };
        get();
    }, [displayItemCount]);

    return (
        <div className="container mx-auto p-4">
            <h2>This is inventory items</h2>
            <div className="grid grid-cols-3 gap-10">
                {items.map((item) => (
                    <InventoryItem key={item._id} item={item}></InventoryItem>
                ))}
            </div>
        </div>
    );
};

export default InventoryItems;
