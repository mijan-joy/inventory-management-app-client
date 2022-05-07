import React from "react";
import Banner from "./Banner/Banner";
import InventoryHealth from "./InventoryHealth/InventoryHealth";
import InventoryItems from "./InventoryItems/InventoryItems";
import StockOverView from "./StockOverView/StockOverView";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <InventoryHealth></InventoryHealth>
            <InventoryItems></InventoryItems>
            <StockOverView></StockOverView>
        </div>
    );
};

export default Home;
