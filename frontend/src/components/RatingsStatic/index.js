import React from "react";
import '../Ratings/Ratings.css'

const StaticRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i className='fas fa-star marked'></i>);
        } else if ( i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i className='fas fa-star-half-alt marked'></i>)
        } else {
            stars.push(<i className='fas fa-star unmarked'></i>)
        }
    }
    return <>{stars}</>
}

export default StaticRating;
