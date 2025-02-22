import React from "react";
import Rating from "./Rating";

const ReviewCard = ({ user_name, rating, comment }) => {
    return (
        <div className="flex flex-col mb-8 items-center rounded-xl shadow-xl outline-1 outline-solid w-full bg-slate-100">
            <div className="p-2 flex flex-row justify-between border-b-1 border-solid w-full">
                <div className="flex flex-row items-center">
                    <div className="rounded-3xl text-xs w-8 h-8 mx-2 flex justify-center items-center bg-black text-white">
                        {user_name[0]}
                    </div>
                    <p>{user_name}</p>
                </div>
                <Rating disabled={true} value={rating} />
            </div>
            <div className="px-4 p-2 mr-auto">
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
