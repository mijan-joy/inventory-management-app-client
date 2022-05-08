import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import Blog from "../Blog/Blog";
import "animate.css";

const Blogs = () => {
    const [questionAndAnswers, setQuestionAndAnswers] = useState(null);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                "https://ps-wms-server.herokuapp.com/qna"
            );
            setQuestionAndAnswers(data);
            console.log(data);
        };
        get();
    }, []);
    if (!questionAndAnswers) {
        return (
            <div className="mx-auto w-48 h-48">
                <Loading></Loading>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold text-center pb-5">QnAs</h2>
            {questionAndAnswers.map((item) => (
                <Blog key={item._id} item={item}></Blog>
            ))}
        </div>
    );
};

export default Blogs;
