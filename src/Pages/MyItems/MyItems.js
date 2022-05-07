import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { get } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { confirm } from "react-confirm-box";

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
        const result = confirm("Confirm Delete?");
        if (result) {
            await axios
                .delete(`http://localhost:5000/inventory/${id}`)
                .then((response) => {
                    console.log(response);
                    const rest = myItems.filter((item) => item._id !== id);
                    setMyItems(rest);
                });
        }
    };
    const handleModifyBtn = (id) => {
        navigate(`/inventory/${id}`);
    };
    const handleAddBtn = () => {
        navigate("/inventory/manage/add");
    };
    return (
        <div className="container mx-auto py-5">
            <div className="py-5 flex items-center">
                <h2 className="pr-5 text-xl">My Items: {myItems.length}</h2>
                <div>
                    <button
                        onClick={handleAddBtn}
                        className="bg-rakib-400 hover:bg-emerald-500 px-5 py-2 rounded-sm text-black"
                    >
                        Add New Item
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-gray-800 ">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="hidden md:table-cell px-6 py-3">
                                Supplier
                            </th>
                            <th className="hidden md:table-cell px-6 py-3">
                                Current Quantity
                            </th>
                            <th className="hidden md:table-cell px-6 py-3">
                                Sold Quantity
                            </th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myItems.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b border-slate-700  odd:bg-gray-600 even:bg-gray-700 "
                            >
                                <th className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {item?.name}
                                </th>
                                <td className="hidden md:table-cell px-6 py-4 text-white/50">
                                    {item?.supplier}
                                </td>
                                <td className="hidden md:table-cell px-6 py-4 text-white/50">
                                    {item?.quantity}
                                </td>
                                <td className="hidden md:table-cell px-6 py-4 text-white/50">
                                    {item?.sold}
                                </td>
                                <td className="px-6 py-4 text-white/50">
                                    <button
                                        className="text-green-500 underline"
                                        onClick={() => {
                                            handleModifyBtn(item._id);
                                        }}
                                    >
                                        Modify
                                    </button>
                                    {" / "}
                                    <button
                                        className="text-rose-600 underline"
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
