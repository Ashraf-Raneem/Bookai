import React, { useEffect, useState } from "react";
import { BookCardCoverlg } from "../components/BookCardCover";
import { getData } from "../components/api_functions";

const BookDetail = () => {
    const [bookData, setBookData] = useState();

    useEffect(() => {
        const path = window.location.pathname.split("/");
        const isbn = path[path.length - 1];
        getData(`/book?book_id=${isbn}`)
            .then((res) => setBookData(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container flex flex-col justify-center items-center">
            {bookData && (
                <React.Fragment>
                    <h2 className="text-2xl font-bold my-8">Here are some details for book {bookData.title}</h2>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <BookCardCoverlg />

                            <div className="grid grid-cols-2 gap-8 mt-8 text-sm">
                                <p className="font-bold">
                                    Title : <span className="italic">{bookData.title}</span>
                                </p>
                                <p className="font-bold">
                                    ISBN : <span className="italic">{bookData.isbn}</span>
                                </p>
                                <p className="font-bold">
                                    Author : <span className="italic">{bookData.author}</span>
                                </p>
                                <p className="font-bold">
                                    Published Year : <span className="italic">{bookData.year}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center items-start">
                            <h3 className="text-2xl font-bold">Reviews</h3>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default BookDetail;
