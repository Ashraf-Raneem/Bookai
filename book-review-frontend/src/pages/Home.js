import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import BookCard from "../components/BookCard";
import { getData } from "../components/api_functions";

const Home = () => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const handleSearch = (e) => {
        getData(`/search?query=${search}`)
            .then((res) => setSearchData(res))
            .catch((error) => console.log(error));
    };

    const clearSearch = () => {
        setSearchData();
        setSearch("");
        setPage(1);
    };

    const handleClick = () => {
        let new_page = page + 1;
        setPage(new_page);
    };

    useEffect(() => {
        setSearchData();
        setPage(1);
    }, []);

    useEffect(() => {
        getData(`/books?page=${page}`)
            .then((res) => setData(res))
            .catch((error) => console.log(error));
    }, [page]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex mt-12 justify-space-between items-center p-2 outline w-1/2 rounded-lg ">
                <input
                    type="text"
                    placeholder="Search with author, book title or isbn number "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full focus:outline-none active:outline-none"
                />
                <button onClick={handleSearch} className="text-gray-800 cursor-pointer">
                    <CiSearch size={20} />
                </button>
            </div>
            {searchData && (
                <div className="mt-4 flex flex-row items-center justify-between w-[700px]">
                    <span className="italic text-sm">
                        Showing results for <strong>"{searchData.query}"</strong>
                    </span>
                    <button
                        className="cursor-pointer p-2 px-12 hover:bg-black text-xs hover:text-white rounded-lg bg-white text-black outline border-white transition"
                        onClick={() => clearSearch()}
                    >
                        Clear Search
                    </button>
                </div>
            )}
            <div className="grid grid-cols-3 gap-8 my-12">
                {searchData ? (
                    searchData.books.map((book) => {
                        return <BookCard book={book} key={book.isbn} />;
                    })
                ) : data.length !== 0 ? (
                    data.map((book) => {
                        return <BookCard book={book} key={book.isbn} />;
                    })
                ) : (
                    <span>... Loading</span>
                )}
            </div>
            {!searchData && (
                <button
                    className="mb-8 cursor-pointer p-2 px-12 bg-black text-xs text-white rounded-lg hover:bg-white hover:text-black hover:outline hover:border-white transition"
                    onClick={() => handleClick()}
                >
                    Show more
                </button>
            )}
        </div>
    );
};

export default Home;
