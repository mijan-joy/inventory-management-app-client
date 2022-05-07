import axios from "axios";
import React, { useEffect, useState } from "react";

const InventoryHealth = () => {
    const [lowStockCount, setLowStockCount] = useState(0);
    const [lowSoldCount, setLowSoldCount] = useState(0);
    const [goodStockCount, setGoodStockCount] = useState(0);
    const [goodSoldCount, setGoodSoldCount] = useState(0);

    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/lowstockcount"
            );
            setLowStockCount(data.count);
        };
        get();
    }, []);
    useEffect(() => {
        const getLowStockCount = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/lowstockcount"
            );
            setLowStockCount(data.count);
        };
        getLowStockCount();
        const getGoodStockCount = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/goodstockcount"
            );
            setGoodStockCount(data.count);
        };
        getGoodStockCount();
        const getGoodSoldCount = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/goodsoldcount"
            );
            setGoodSoldCount(data.count);
        };
        getGoodSoldCount();
        const getLowSoldCount = async () => {
            const { data } = await axios.get(
                "http://localhost:5000/lowsoldcount"
            );
            setLowSoldCount(data.count);
        };
        getLowSoldCount();
    }, [lowSoldCount, goodStockCount, lowSoldCount, goodSoldCount]);

    return (
        <div>
            <h2>Inventory Health Check</h2>
            <p>Low Stock Items Count: {lowStockCount}</p>
            <p>Good Stock Items Count: {goodStockCount}</p>
            <p>Low Sold Items Count: {lowSoldCount}</p>
            <p>Good Sold Items Count: {goodSoldCount}</p>
        </div>
    );
};

export default InventoryHealth;
