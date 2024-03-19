import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
        .then((res) => {
            setAuthor(res.data.author);
            setTitle(res.data.title);
            setPublishYear(res.data.publishYear);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            alert('Some error has occured');
            console.log(error);
        });
    }, []);

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
        .put(`http://localhost:5555/books/${id}`, data)
        .then(() => {
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
            alert('An error has occured.');
            console.log(error);
        });
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4 font-serif">📝 Edit Book</h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] mx-auto p-6">
                <div className="my-4">
                    <label className="text-lg text-gray-700 font-semibold mb-2">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-400 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-sky-500" />
                </div>
                <div className="my-4">
                    <label className="text-lg text-gray-700 font-semibold mb-2">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border border-gray-400 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-sky-500" />
                </div>
                <div className="my-4">
                    <label className="text-lg text-gray-700 font-semibold mb-2">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border border-gray-400 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-sky-500" />
                </div>
                <button className="py-2 px-4 bg-sky-500 text-white rounded-md font-semibold hover:bg-sky-600 transition duration-300 ease-in-out" onClick={handleEditBook}>
                    Save
                </button>
            </div>

        </div>
    );
}

export default EditBook;