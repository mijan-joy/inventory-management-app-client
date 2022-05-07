import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Loading from "../../Shared/Loading/Loading";

const StockOverView = () => {
    const [items, setItems] = useState(null);
    useEffect(() => {
        const get = async () => {
            await axios
                .get(`https://ps-wms-server.herokuapp.com/inventory`)
                .then((response) => {
                    setItems(response.data);
                });
        };
        get();
    }, []);

    if (!items) {
        return (
            <div className="mx-auto w-48 h-48">
                {" "}
                <Loading></Loading>{" "}
            </div>
        );
    }
    return (
        <div className="container mx-auto py-5 pt-24 bg-gray-900">
            <div>
                <h2 className="text-3xl font-bold pb-5 text-center">
                    Quantity Vs Sales Overview
                </h2>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        width={500}
                        height={300}
                        data={items}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" stackId="a" fill="#069A8E" />
                        <Bar dataKey="sold" stackId="a" fill="#A1E3D8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockOverView;
