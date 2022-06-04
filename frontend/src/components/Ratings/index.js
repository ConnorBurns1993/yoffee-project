import React from "react";
import "./Ratings.css";
import { useState } from "react";

const Rating = ({ rating, setRating }) => {
  const stars = Array(5).fill(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (e) => {
    setRating(e);
    console.log(e);
  };

  const handleMouseOver = (e) => {
    setHoverValue(e);
  };

  const handleMouseLeave = (e) => {
    setHoverValue(undefined);
  };

  return (
    <div className="ratings-reviews-wrapper">
      {stars.map((_, index) => {
        return (
          <li className="star-wrapper" key={index}>
            <i
              className={
                (hoverValue || rating) > index
                  ? "fa-solid fa-star marked"
                  : "fa-solid fa-star unmarked"
              }
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            ></i>
          </li>
        );
      })}
    </div>
  );
};

export default Rating;
