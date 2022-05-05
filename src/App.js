import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import ManageItem from "./Pages/ManageItem/ManageItem";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route
                        path="/inventory/:id"
                        element={<ManageItem></ManageItem>}
                    ></Route>
                </Routes>
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
}

export default App;
