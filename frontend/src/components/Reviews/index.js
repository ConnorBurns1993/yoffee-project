import { useEffect } from "react";
import { getReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import "./Reviews.css";

function Reviews() {
  const reviews = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const { businessId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(businessId));
  }, []);

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    dispatch(getReviews(businessId));
  };

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
                    <img
                      className="review-profile-picture"
                      src={
                        review?.User?.profilePicture
                          ? review.User.profilePicture
                          : ""
                      }
                    ></img>
                    <div>{review?.User?.name ? review.User.name : ""}</div>
                    <div>{review.description}</div>
                    <div>{review.rating}</div>
                    {sessionUser.id === review.userId && (
                      <button onClick={() => handleDelete(review.id)}>
                        Delete
                      </button>
                    )}
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
