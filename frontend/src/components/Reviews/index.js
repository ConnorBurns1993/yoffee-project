import { useEffect } from "react";
import { getReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { useState } from "react";
import StaticRating from "../RatingsStatic";
import "./Reviews.css";

function Reviews() {
  const reviews = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const { businessId } = useParams();

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(businessId));
  }, [dispatch, businessId]);

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    dispatch(getReviews(businessId));
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <h2 className="recommended-reviews">Recommended Reviews</h2>
      <ul>
        {Object.values(reviews)
          .sort()
          .reverse()
          .map((review) => (
            <div>
              <div className="businesses-wrapper2">
                <li key={review.id}>
                  <div>
                    <img
                      className="review-profile-picture"
                      src={
                        review?.User?.profilePicture
                          ? review.User.profilePicture
                          : ""
                      }
                    ></img>
                    <div className="review-name">
                      {review?.User?.name ? review.User.name : ""}
                    </div>
                    <div>
                      <div className="rating-size">
                        <StaticRating rating={review.rating} />
                      </div>
                    </div>
                    <div className="review-content">{review.description}</div>
                    {sessionUser.id === review.userId && (
                      <div onClick={openMenu}>
                        {showMenu && (
                          <div
                            className="delete-your-review"
                            onClick={() => handleDelete(review.id)}
                          >
                            Delete
                          </div>
                        )}
                        <i className="fa-solid fa-ellipsis more-details"></i>
                      </div>
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
