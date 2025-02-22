import React, { useState } from "react";

const Rating = ({ disabled, value, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex justify-center items-center">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            name="rating"
                            style={{ display: "none" }}
                            value={ratingValue}
                            disabled={disabled}
                            onClick={() => setRating(ratingValue)}
                        />
                        <svg
                            onMouseEnter={() => !disabled && setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
                            width="20"
                            height="20"
                            style={{ cursor: "pointer", marginRight: "1px" }}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                        </svg>
                    </label>
                );
            })}
        </div>
    );
};

export default Rating;
