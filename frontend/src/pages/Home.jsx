import React, { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="p-4">
            <div className="flex justify-between items-center bg-gray-100 py-4 px-6 shadow-md rounded-lg mb-4">
                <h1 className="text-3xl text-gray-800 font-semibold inline-flex items-center font-serif">
                    <span className="text-sky-500 text-4xl mr-2">📚</span> Book Management System
                </h1>
                <Link to='/books/create' className="flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white text-2xl rounded-full w-12 h-12">
                    <MdOutlineAddBox />
                </Link>
            </div>

            {/*
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>*/
            }
            {
                loading ? (
                    <Spinner />
                ) : (

                    <table className="w-full border-separate border-spacing-2">
                        <thead className="bg-gray-200 border-b-2 border-gray-200">
                            <tr>
                                <th className="border-slate-600 rounded-md p-3 text-sm font-semibold tracking-wide text-left">No</th>
                                <th className="border-slate-600 rounded-md p-3 text-sm font-semibold tracking-wide text-left">Title</th>
                                <th className="border-slate-600 rounded-md max-md:hidden p-3 text-sm font-semibold tracking-wide text-left">Author</th>
                                <th className="border-slate-600 rounded-md max-md:hidden p-3 text-sm font-semibold tracking-wide text-left">Publish Year</th>
                                <th className="border-slate-600 rounded-md p-3 text-sm font-semibold tracking-wide text-left">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book, index) => (
                                    <tr key={book._id} className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center p-3 text-sm font-medium">
                                            {index + 1}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center p-3 text-sm font-medium">
                                            {book.title}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden p-3 text-sm font-medium">
                                            {book.author}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden p-3 text-sm font-medium">
                                            {book.publishYear}
                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center p-3 text-sm font-medium">
                                            <div className="flex justify-center gap-x-4">
                                                <Link to={`/books/details/${book._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800' />
                                                </Link>
                                                <Link to={`/books/edit/${book._id}`}>
                                                    <AiOutlineEdit className='text-2xl text-yellow-800' />
                                                </Link>
                                                <Link to={`/books/delete/${book._id}`}>
                                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                )
            }
        </div>
    );
}

export default Home;