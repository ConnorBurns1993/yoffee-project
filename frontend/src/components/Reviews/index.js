import { useEffect } from "react";
import { getReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import './Reviews.css'

function Reviews() {

const reviews = useSelector(state => {
    return Object.values(state.reviews)
})

const sessionUser = useSelector((state) => state.session.user)

const dispatch = useDispatch();

useEffect(() => {
    const dis = dispatch(getReviews())
    console.log(dis)
}, [dispatch])



return (
<>
    <h2>All Reviews</h2>
    <ul>
    {reviews.map((review) => (
        <div><div className='businesses-wrapper'>
        <li className='businesses-li' key={review.id}>
        <div className="business-content"><div>{review.description}</div>
        <div>{review.rating}</div>
        </div>
        </li>
        </div>
        </div>
        ))}
</ul>
</>
)
}

export default Reviews;
