import React from "react";
import BookCardCover from "./BookCardCover";

const BookCard = ({ book }) => {
    return (
        <div
            className="bg-slate-200 flex flex-col container w-54 h-52 mx-auto border-solid outline rounded-sm shadow-lg"
            key={book.isbn}
        >
            <BookCardCover />
            <div className="flex flex-col px-2 antialiased my-4">
                <p className="text-sm text-left ">
                    Title : <span className="font-bold ml-1">{book.title}</span>
                </p>
                <p className="text-sm text-left">
                    Author : <span className="font-bold ml-1">{book.author}</span>
                </p>
                <button className="mt-4 text-xs p-1 bg-slate-600 text-white rounded-lg hover:bg-slate-900 transition cursor-pointer">
                    {" "}
                    View Details{" "}
                </button>
            </div>
        </div>
    );
};

export default BookCard;
