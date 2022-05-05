import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ManageItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const get = async () => {
        await axios
            .get(`http://localhost:5000/inventory/${id}`)
            .then((response) => {
                setItem(response.data);
            });
    };
    get();
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
        </div>
    );
};

export default ManageItem;
