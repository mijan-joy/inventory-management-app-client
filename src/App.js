import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home/Home";
import ManageItem from "./Pages/ManageItem/ManageItem";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import AddItem from "./Pages/AddItem/AddItem";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/LogIn/Register/Register";
import VerifyEmail from "./Pages/LogIn/VerifyEmail/VerifyEmail";
import MyItems from "./Pages/MyItems/MyItems";
import RequireAuth from "./Pages/LogIn/RequireAuth/RequireAuth";
import ResetPassword from "./Pages/LogIn/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";
import UpdateItem from "./Pages/UpdateItem/UpdateItem";

function App() {
    return (
        <div className="font-roboto grid min-h-screen page-container bg-black text-white">
            <Header></Header>
            <div>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route
                        path="/inventory/:id"
                        element={
                            <RequireAuth>
                                <ManageItem></ManageItem>
                            </RequireAuth>
                        }
                    ></Route>
                    <Route
                        path="/inventory/manage"
                        element={
                            <RequireAuth>
                                <ManageInventory></ManageInventory>
                            </RequireAuth>
                        }
                    ></Route>
                    <Route
                        path="/inventory/myitems"
                        element={
                            <RequireAuth>
                                <MyItems></MyItems>
                            </RequireAuth>
                        }
                    ></Route>
                    <Route
                        path="/inventory/manage/add"
                        element={
                            <RequireAuth>
                                <AddItem></AddItem>
                            </RequireAuth>
                        }
                    ></Route>
                    <Route
                        path="/inventory/update/:id"
                        element={
                            <RequireAuth>
                                <UpdateItem></UpdateItem>
                            </RequireAuth>
                        }
                    ></Route>
                    <Route path="/login" element={<LogIn></LogIn>}></Route>
                    <Route
                        path="/login/register"
                        element={<Register></Register>}
                    ></Route>
                    <Route
                        path="/verifyemail"
                        element={<VerifyEmail></VerifyEmail>}
                    ></Route>
                    <Route
                        path="/resetpassword"
                        element={<ResetPassword></ResetPassword>}
                    ></Route>
                    <Route path="*" element={<NotFound></NotFound>}></Route>
                </Routes>
            </div>
            <Footer></Footer>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
