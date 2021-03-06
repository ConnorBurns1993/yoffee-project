import React from "react";
import "./RatingsStatic.css";

const StaticRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i className="fas fa-star markedstatic"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i className="fas fa-star halfstatic"></i>);
    } else {
      stars.push(<i className="fas fa-star unmarkedstatic"></i>);
    }
  }
  return <>{stars}</>;
};

export default StaticRating;
