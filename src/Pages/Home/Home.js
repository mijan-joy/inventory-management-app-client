import React from "react";
import Banner from "./Banner/Banner";
import InventoryHealth from "./InventoryHealth/InventoryHealth";
import InventoryItems from "./InventoryItems/InventoryItems";
import StockOverView from "./StockOverView/StockOverView";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <InventoryItems></InventoryItems>
            <StockOverView></StockOverView>
            <InventoryHealth></InventoryHealth>
        </div>
    );
};

export default Home;
