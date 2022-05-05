import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageInventory = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const get = async () => {
            await axios
                .get(`http://localhost:5000/inventory`)
                .then((response) => {
                    setItems(response.data);
                });
        };
        get();
    }, []);
    const handleDeleteBtn = async (id) => {
        const proceed = window.confirm("do you want ot delete?");
        if (proceed) {
            await axios
                .delete(`http://localhost:5000/inventory/${id}`)
                .then((response) => {
                    console.log(response);
                    const rest = items.filter((item) => item._id !== id);
                    setItems(rest);
                });
        }
    };
    const handleAddBtn = () => {
        navigate("/inventory/manage/add");
    };
    return (
        <div className="container mx-auto">
            <h2>Manage Inventory ({items.length})</h2>
            <div className="elative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Supplier</th>
                            <th className="px-6 py-3">Current Quantity</th>
                            <th className="px-6 py-3">Sold Quantity</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                            >
                                <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {item?.name}
                                </th>
                                <td className="px-6 py-4">{item?.supplier}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.sold}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleDeleteBtn(item._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    onClick={handleAddBtn}
                    className="rounded-full bg-sky-500 text-white px-4"
                >
                    Add New Item
                </button>
            </div>
        </div>
    );
};

export default ManageInventory;
