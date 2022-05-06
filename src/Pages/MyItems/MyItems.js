import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { get } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyItems = () => {
    const [user, loading, error] = useAuthState(auth);
    const [myItems, setMyItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const get = async () => {
            try {
                await axios
                    .get(
                        `http://localhost:5000/inventory/myitems?email=${user.email}`,
                        {
                            headers: {
                                authorization: `Bearer: ${localStorage.getItem(
                                    "authToken"
                                )}`,
                            },
                        }
                    )
                    .then((response) => {
                        setMyItems(response.data);
                    });
            } catch (error) {
                console.log(error);
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    signOut(auth);
                    navigate("/login");
                }
            }
        };
        get();
    }, [user]);
    const handleDeleteBtn = async (id) => {
        const proceed = window.confirm("do you want ot delete?");
        if (proceed) {
            await axios
                .delete(`http://localhost:5000/inventory/${id}`)
                .then((response) => {
                    console.log(response);
                    const rest = myItems.filter((item) => item._id !== id);
                    setMyItems(rest);
                });
        }
    };
    return (
        <div>
            <h2>My Items</h2>
            <h2>Count: {myItems?.length}</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        {myItems.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                            >
                                <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {item?.name}
                                </th>
                                <td className="px-6 py-4">{item?.supplier}</td>
                                <td className="px-6 py-4">{item?.quantity}</td>
                                <td className="px-6 py-4">{item?.sold}</td>
                                <td className="px-6 py-4">
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
        </div>
    );
};

export default MyItems;
