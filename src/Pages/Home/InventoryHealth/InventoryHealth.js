import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const InventoryHealth = () => {
    const [lowStockCount, setLowStockCount] = useState(0);
    const [lowSoldCount, setLowSoldCount] = useState(0);
    const [goodStockCount, setGoodStockCount] = useState(0);
    const [goodSoldCount, setGoodSoldCount] = useState(0);

    const data = [
        { name: "Low Sold", value: lowSoldCount },
        { name: "Good Sold", value: goodSoldCount },
        { name: "Low Stock", value: lowStockCount },
        { name: "Good Stock", value: goodStockCount },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                "https://ps-wms-server.herokuapp.com/lowstockcount"
            );
            setLowStockCount(data.count);
        };
        get();
    }, []);
    useEffect(() => {
        const getLowStockCount = async () => {
            const { data } = await axios.get(
                "https://ps-wms-server.herokuapp.com/lowstockcount"
            );
            setLowStockCount(data.count);
        };
        getLowStockCount();
        const getGoodStockCount = async () => {
            const { data } = await axios.get(
                "https://ps-wms-server.herokuapp.com/goodstockcount"
            );
            setGoodStockCount(data.count);
        };
        getGoodStockCount();
        const getGoodSoldCount = async () => {
            const { data } = await axios.get(
                "https://ps-wms-server.herokuapp.com/goodsoldcount"
            );
            setGoodSoldCount(data.count);
        };
        getGoodSoldCount();
        const getLowSoldCount = async () => {
            const { data } = await axios.get(
                "https://ps-wms-server.herokuapp.com/lowsoldcount"
            );
            setLowSoldCount(data.count);
        };
        getLowSoldCount();
    }, [lowSoldCount, goodStockCount, lowSoldCount, goodSoldCount]);

    return (
        <div className="container mx-auto py-10">
            <div className="border mx-auto bg-darkbg p-5 border-slate-600 rounded-lg max-w-[700px]">
                <h2 className="text-3xl font-bold text-center pb-2 mb-5 border-b">
                    Inventory Health Check
                </h2>
                <div className="md:flex items-center justify-around">
                    <div>
                        <p className="py-1 text-[#FFBB28]">
                            Low Stock Items Count: {lowStockCount}
                        </p>
                        <p className="py-1 text-[#FF8042]">
                            Good Stock Items Count: {goodStockCount}
                        </p>
                        <p className="py-1 text-[#0088FE]">
                            Low Sold Items Count: {lowSoldCount}
                        </p>
                        <p className="py-1 text-[#00C49F]">
                            Good Sold Items Count: {goodSoldCount}
                        </p>
                    </div>
                    <div>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryHealth;
