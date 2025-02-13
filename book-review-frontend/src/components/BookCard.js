import React from "react";
import BookCardCover from "./BookCardCover";

const BookCard = () => {
    return (
        <div className="bg-slate-200 flex cursor-pointer flex-col container w-54 h-52 mx-auto border-solid  outline rounded-sm shadow-lg">
            <BookCardCover />
            <div className="flex flex-col px-2 antialiased my-4">
                <p className="text-sm text-left ">
                    Title : <span className="font-bold ml-1">Ashraf</span>
                </p>
                <p className="text-sm text-left">
                    Author : <span className="font-bold ml-1">Hum tere hai kaun</span>
                </p>
            </div>
        </div>
    );
};

export default BookCard;
