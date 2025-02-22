import React, { useEffect, useState } from "react";
import { BookCardCoverlg } from "../components/BookCardCover";
import { getData } from "../components/api_functions";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

const BookDetail = () => {
    const [bookData, setBookData] = useState();
    const [reviewData, setReviewData] = useState([]);
    const [reviewForm, setReviewForm] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const path = window.location.pathname.split("/");
    const isbn = path[path.length - 1];

    useEffect(() => {
        getData(`/book?book_id=${isbn}`)
            .then((res) => setBookData(res))
            .catch((err) => console.log(err));
        getData(`/review?book_id=${isbn}&user_id=${user.id}`)
            .then((res) => setReviewData(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container flex flex-col justify-center items-center">
            {bookData && (
                <React.Fragment>
                    <h2 className="text-2xl font-bold my-8">Here are some details for book {bookData.title}</h2>
                    <div className="flex flex-col justify-center items-start lg:grid grid-cols-3 gap-8 mx-2">
                        <div className="lg:col-span-1 ml-2">
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
                        <div className="flex flex-col items-center justify-start lg:col-span-2 max-w-[700px]">
                            <div className="flex flex-row justify-between item-center w-full">
                                <h3 className="text-2xl font-bold">Reviews</h3>
                                {!reviewData.some((item) => item["user_id"] === user.id) ? (
                                    <button
                                        onClick={() => setReviewForm(!reviewForm)}
                                        className="mb-8 cursor-pointer p-2 px-12 bg-black text-xs text-white rounded-lg hover:bg-white hover:text-black hover:outline hover:border-white transition"
                                    >
                                        {reviewForm ? "Close" : "Add review"}
                                    </button>
                                ) : (
                                    <span className="text-xs italic">You already have a review</span>
                                )}
                            </div>
                            <span className="text-sm italic mr-auto mb-4">Showing {reviewData.length} reviews</span>
                            {reviewForm && <ReviewForm user={user} book_id={isbn} />}
                            {reviewData.length > 0 ? (
                                reviewData.map(({ key, rating, username, comment }) => {
                                    return (
                                        <ReviewCard key={key} user_name={username} rating={rating} comment={comment} />
                                    );
                                })
                            ) : (
                                <p>No reviews to show</p>
                            )}
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default BookDetail;
