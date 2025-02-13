import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import BookCard from "../components/BookCard";

const Home = () => {
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        e.prevendefault();
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex mt-12 justify-space-between items-center p-2 outline w-1/2 rounded-lg ">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full focus:outline-none active:outline-none"
                />
                <button onClick={handleSearch} className="text-gray-800 cursor-pointer">
                    <CiSearch size={20} />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-8 my-20">
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
            </div>
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Show more</button>
        </div>
    );
};

export default Home;
