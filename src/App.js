import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import ManageItem from "./Pages/ManageItem/ManageItem";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import AddItem from "./Pages/AddItem/AddItem";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/Register/Register";

function App() {
    return (
        <div>
            <Header></Header>
            <div>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route
                        path="/inventory/:id"
                        element={<ManageItem></ManageItem>}
                    ></Route>
                    <Route
                        path="/inventory/manage"
                        element={<ManageInventory></ManageInventory>}
                    ></Route>
                    <Route
                        path="/inventory/manage/add"
                        element={<AddItem></AddItem>}
                    ></Route>
                    <Route path="/login" element={<LogIn></LogIn>}></Route>
                    <Route
                        path="/register"
                        element={<Register></Register>}
                    ></Route>
                </Routes>
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
}

export default App;
