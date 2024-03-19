import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useBeforeUnload, useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`http://localhost:5555/books/${id}`)
        .then(() => {
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
            alert('Some error has occured.');
            console.log(error);
        });
    }
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Delete Book 🗑️ </h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">Are you sure you want to delete this book?</h3>
                <button className="py-3 px-6 bg-red-600 text-white rounded-md w-full max-w-md hover:bg-red-700 transition duration-300 ease-in-out">
                    Yes, Delete it
                </button>
            </div>

        </div>
    );
}

export default DeleteBook;