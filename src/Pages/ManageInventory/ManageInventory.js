import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loading from "../Shared/Loading/Loading";
import "animate.css";

const ManageInventory = () => {
    const [itemsCount, setItemsCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const get = async () => {
            setLoading(true);
            await axios
                .get(
                    `https://ps-wms-server.herokuapp.com/inventory?page=${currentPage}&pagesize=${pageSize}`
                )
                .then((response) => {
                    setLoading(false);
                    setItems(response.data);
                });
        };
        get();
    }, [currentPage, pageSize]);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `https://ps-wms-server.herokuapp.com/inventorycount`
            );
            setPageCount(Math.ceil(data.count / pageSize));
            setItemsCount(data.count);
        };
        get();
    }, [pageSize]);

    const handleDeleteBtn = async (id) => {
        confirmAlert({
            title: "Confirm to Delete",
            message: "Are you sure to do this?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await axios
                            .delete(
                                `https://ps-wms-server.herokuapp.com/inventory/${id}`
                            )
                            .then((response) => {
                                const rest = items.filter(
                                    (item) => item._id !== id
                                );
                                setItems(rest);
                            });
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };
    const handleModifyBtn = (id) => {
        navigate(`/inventory/${id}`);
    };
    const handleAddBtn = () => {
        navigate("/inventory/manage/add");
    };
    if (!items) {
        return (
            <div className="mx-auto w-48 h-48">
                <Loading></Loading>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-5">
            <div className="py-5 flex items-center  ">
                <h2 className="pr-5 text-xl">
                    Showing {items.length} of {itemsCount} items
                </h2>
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
                <table className="w-full relative text-sm text-left text-gray-500 animate__animated animate__fadeInUp animate__faster">
                    <thead className="text-xs text-white uppercase bg-gray-800 ">
                        <tr>
                            <th className="px-6 py-3">
                                {loading ? (
                                    <span className="text-rakib-400">
                                        Loading...
                                    </span>
                                ) : (
                                    "Name"
                                )}
                            </th>
                            <th className="hidden md:table-cell px-6 py-3">
                                {loading ? (
                                    <span className="text-rakib-400">
                                        Loading...
                                    </span>
                                ) : (
                                    "Supplier"
                                )}
                            </th>
                            <th className="hidden md:table-cell px-6 py-3">
                                {loading ? (
                                    <span className="text-rakib-400">
                                        Loading...
                                    </span>
                                ) : (
                                    "Stock Qty"
                                )}
                            </th>
                            <th className="hidden md:table-cell px-6 py-3">
                                {loading ? (
                                    <span className="text-rakib-400">
                                        Loading...
                                    </span>
                                ) : (
                                    "Sold Qty"
                                )}
                            </th>
                            <th className="px-6 py-3">
                                {loading ? (
                                    <span className="text-rakib-400">
                                        Loading...
                                    </span>
                                ) : (
                                    "Action"
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b border-slate-700  odd:bg-gray-600 even:bg-gray-700 hover:bg-gray-500"
                            >
                                <th className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {item?.name}
                                </th>
                                <td className="hidden md:table-cell px-6 py-4 text-white/50">
                                    {item?.supplier}
                                </td>
                                <td
                                    className={`hidden md:table-cell px-6 py-4 ${
                                        item.quantity < 5
                                            ? "text-rose-600"
                                            : "text-white/50"
                                    }`}
                                >
                                    {item?.quantity}
                                </td>
                                <td className="hidden md:table-cell px-6 py-4 text-white/50">
                                    {item?.sold}
                                </td>
                                <td className="px-6 py-4 text-white">
                                    <button
                                        onClick={() => {
                                            handleModifyBtn(item._id);
                                        }}
                                    >
                                        {" "}
                                        <PencilAltIcon className="inline text-emerald-500 w-5 h-6"></PencilAltIcon>
                                        Details
                                    </button>
                                    {" / "}
                                    <button
                                        onClick={() => {
                                            handleDeleteBtn(item._id);
                                        }}
                                    >
                                        {" "}
                                        <TrashIcon className="inline text-red-500 w-5 h-5"></TrashIcon>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center py-5">
                {[...Array(pageCount).keys()].map((number) => (
                    <button
                        className={
                            currentPage === number
                                ? "bg-rakib-400 text-black py-1 px-2 mr-2"
                                : "bg-white text-black py-1 px-2 mr-2"
                        }
                        onClick={() => setCurrentPage(number)}
                        key={number}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageInventory;
