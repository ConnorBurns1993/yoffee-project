import { useEffect } from "react";
import { getReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Reviews.css";

function Reviews() {
  const reviews = useSelector((state) => state.reviews);
  const { businessId } = useParams();

  const business = useSelector((state) => state.businesses[businessId]);
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(businessId);
    dispatch(getReviews(businessId));
  }, []);

  return (
    <>
      <h2>All Reviews</h2>
      <ul>
        {Object.values(reviews)
          .sort()
          .reverse()
          .map((review) => (
            <div>
              <div className="businesses-wrapper">
                <li className="businesses-li" key={review.id}>
                  <div className="business-content">
                    <div>{review.description}</div>
                    <div>{review.rating}</div>
                  </div>
                </li>
              </div>
            </div>
          ))}
      </ul>
    </>
  );
}

export default Reviews;
