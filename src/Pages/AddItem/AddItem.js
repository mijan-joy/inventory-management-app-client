import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddItem = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        data.quantity = parseInt(data.quantity);
        data.price = parseInt(data.price);
        data.sold = parseInt(data.sold);
        console.log(data);
        const post = async () => {
            await axios
                .post("http://localhost:5000/inventory/manage/add", data)
                .then((response) => console.log(response));
        };
        post();
    };
    return (
        <div>
            <h1>Add Item to Inventory</h1>
            <div>
                <form
                    className="w-1/2 mx-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Item Name:
                        </label>
                        <input
                            id="name"
                            className="block py-1 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="eg: Pump for M825HI"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("name")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="img"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Image URL:
                        </label>
                        <input
                            id="img"
                            className="block py-1 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="eg: https://i.ibb.co/fnkyFJg/btmark.png"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("img")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Short Description:
                        </label>
                        <textarea
                            id="description"
                            className="block py-1 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Item description here"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("description")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Item Price:
                        </label>
                        <input
                            id="price"
                            className="block py-1 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="eg: https://i.ibb.co/fnkyFJg/btmark.png"
                            required
                            type="number"
                            autoComplete="off"
                            {...register("price")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="quantity"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Initial quantity:
                        </label>
                        <input
                            id="quantity"
                            className="block py-1 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="eg: https://i.ibb.co/fnkyFJg/btmark.png"
                            required
                            type="number"
                            autoComplete="off"
                            {...register("quantity")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="supplier"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Supplier:
                        </label>
                        <input
                            id="supplier"
                            className="block  px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="eg: https://i.ibb.co/fnkyFJg/btmark.png"
                            required
                            type="text"
                            autoComplete="off"
                            {...register("supplier")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="sold"
                            className="block mt-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Sold Quantity:{" "}
                            <span className="text-xs">
                                Initial value should be 0
                            </span>
                        </label>
                        <input
                            id="sold"
                            className="block px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                            type="number"
                            value="0"
                            autoComplete="off"
                            {...register("sold")}
                        />
                    </div>

                    <input
                        className="rounded-full bg-sky-600 text-white px-4"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddItem;
