import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InventoryItem from "../InventoryItem/InventoryItem";
import Loading from "../../Shared/Loading/Loading";

const InventoryItems = () => {
    const [items, setItems] = useState([]);
    const [displayItemCount, setDisplayItemCount] = useState(6);
    const [itemsCount, setItemsCount] = useState(0);

    useEffect(() => {
        const get = async () => {
            await axios
                .get(
                    `http://localhost:5000/inventory?display=${displayItemCount}`
                )
                .then((response) => {
                    setItems(response.data);
                });
        };
        get();
    }, [displayItemCount]);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/inventorycount"
            );
            setItemsCount(data.count);
        };
        get();
    }, []);
    if (items.length === 0) {
        return (
            <div className="mx-auto w-48 h-48">
                <Loading></Loading>
            </div>
        );
    }
    return (
        <div className="bg-gradient-to-b from-black to-gray-900 mt-14">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold pb-5 text-center">
                    Inventory Items ({items?.length} / {itemsCount})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10 justify-center py-5">
                    {items.map((item) => (
                        <InventoryItem
                            key={item._id}
                            item={item}
                        ></InventoryItem>
                    ))}
                </div>
                <div className="py-5 pb-10 text-center">
                    <Link
                        to="/inventory/manage"
                        className="bg-rakib-400 hover:bg-emerald-500 px-14 py-3 rounded-sm text-black"
                    >
                        Manage Items
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InventoryItems;
