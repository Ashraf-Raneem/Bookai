import React, { useState } from "react";
import Rating from "./Rating";
import { postData } from "./api_functions";

const ReviewForm = ({ book_id, user }) => {
    const [review, setReview] = useState("");
    const [ratings, setRatings] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        postData("/review", {
            book_id: book_id,
            user_id: user.id,
            user_name: user.username,
            comment: review,
            rating: ratings,
        })
            .then((res) => console.log(res))
            .catch((err) => console.log("Error", err));
        window.location.reload();
        setReview(""); // Clear the input field after submission
    };

    return (
        <div className="flex flex-col mb-8 p-2 rounded-xl shadow-xl outline-1 outline-solid w-full bg-slate-100 mr-auto">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row">
                    <p className="mr-4">Rating : </p>
                    <Rating value={ratings} disabled={false} setRating={setRatings} />
                </div>
                <textarea
                    className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="my-2 w-full cursor-pointer p-2 px-12 bg-black text-xs text-white rounded-lg hover:bg-white hover:text-black hover:outline hover:border-white transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
