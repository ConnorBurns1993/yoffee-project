import { useEffect, useState } from "react";
import { getOneBusiness } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { deleteBusiness } from '../../store/businesses'
import { useHistory } from "react-router-dom";
import EditBusinessForm from "../EditBusinessForm/EditBusinessForm";
import Reviews from "../Reviews";
import './BusinessDetail.css'
import { getReviews } from "../../store/reviews";
import StaticRating from "../RatingsStatic";

function BusinessDetail() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const business = useSelector(state => state.businesses[businessId])
    const reviews = useSelector(state => state.reviews)

    const [editForm, setEditForm] = useState(false)

    let content = null;

//     let currentBusinessReviews = [];
//     if(reviews && business && reviews.length > 0) {
//     currentBusinessReviews = reviews.forEach(review => {
//         if (review.businessId === business.id) {
//             currentBusinessReviews.push(review)
//             return currentBusinessReviews
//         }
//     })
// }
console.log(reviews)


    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteBusiness(businessId))
        history.push("/businesses")
    }

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch])

    useEffect(() => {
        dispatch(getOneBusiness(businessId))
        setEditForm(false);
    }, [dispatch, businessId])

    if (editForm) {
        content = <EditBusinessForm
                    business={business}
                    hideForm={() => setEditForm(false)}/>
    }

    return (
        <div>
    <div className='business-id-wrapper'>
    <img alt='' src={business.businessImage}></img>
    <StaticRating rating={3.5}/>
    <div>{business.title}</div>
    <div>{business.description}</div>
    <div>{business.address}</div>
    {(business.ownerId === sessionUser.id) ?
    <div>

       {(!editForm) && (
        <button onClick={() => setEditForm(true)}>Edit</button>
          )}

    <Link to={`/businesses/${business.id}`}>
    <button onClick={handleClick}>Delete</button></Link>

    </div> : null }
    </div>
    <div className='edit-business'>{content}</div>
    {/* {currentBusinessReviews.length < 1 && <p>This business has no reviews. Be the first!</p>}
        {currentBusinessReviews && currentBusinessReviews.length > 0 &&
            currentBusinessReviews.map(review => <Reviews key={review.id} business={business} review={review} />)
        } */}

        <Reviews />
        </div>


    )
    }

    export default BusinessDetail;
