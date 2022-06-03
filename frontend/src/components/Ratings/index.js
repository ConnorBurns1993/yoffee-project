import React from "react";
import './Ratings.css'
import { useState } from "react";

const Rating = () => {

    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    const handleClick = e => {
        setCurrentValue(e)
    }

    const handleMouseOver = e => {
        setHoverValue(e)
    }

    const handleMouseLeave = e => {
        setHoverValue(undefined)
    }

    return (
        <div className='ratings-reviews-wrapper'>
            {stars.map((_, index) => {
                return (
                    <li className='star-wrapper' key={index}>
                    <i
                    className={(hoverValue || currentValue) > index ? 'fa-solid fa-star marked' : 'fa-solid fa-star unmarked' }
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}></i></li>
                    )
                })}
                <div className='inner-reviews-wrapper'>
                <textarea
                className='review-textarea'
                placeholder="Leave a review here, make sure to let us know what you liked and didn't like!"></textarea>
                <button>Submit</button>
        </div>
        </div>
    )
}

export default Rating;
