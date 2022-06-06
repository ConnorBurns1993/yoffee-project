import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteBusiness, getOneBusiness } from "../../store/businesses";
import * as sessionActions from "../../store/session";
import EditBusinessForm from "../EditBusinessForm/EditBusinessForm";
import AddReviewForm from "../AddReviewForm";
import StaticRating from "../RatingsStatic";
import Reviews from "../Reviews";
import "./BusinessDetail.css";

function BusinessDetail() {
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const business = useSelector((state) => state.businesses[businessId]);
  const reviews = useSelector((state) => state.reviews);

  const [average, setAverage] = useState(0);

  useEffect(() => {
    const reviewsArray = Object.values(reviews);
    // console.log(reviewsArray);
    if (reviewsArray.length) {
      const sum = reviewsArray.reduce((accum, currentValue) => {
        return { rating: accum.rating + currentValue.rating };
      });
      setAverage(sum.rating / reviewsArray.length);
    }
  }, [reviews]);

  const [editForm, setEditForm] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);

  let content = null;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteBusiness(businessId));
    history.push("/businesses");
  };

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneBusiness(businessId));
    setEditForm(false);
  }, [dispatch, businessId]);

  if (editForm) {
    content = (
      <EditBusinessForm
        business={business}
        hideForm={() => setEditForm(false)}
      />
    );
  }

  return (
    <div>
      {business && (
        <>
          <div className="business-id-wrapper">
            <img
              className="default-business-image"
              alt=""
              src="https://i.imgur.com/Fu6ThW8.jpg"
            ></img>
            <div className="business-title">{business.title}</div>
            <div className="business-rating">
              {reviews && <StaticRating rating={average} />}
            </div>
            <div className="claimed">
              <i className="fa-solid fa-circle-check check"></i>Claimed
            </div>
            <i className="fa-solid fa-circle dot"></i>
            <div className="business-description">{business.description}</div>
            <p className="open2">8:00 AM - 10:00 PM</p>
            {business.ownerId === sessionUser.id ? (
              <div>
                {!editForm && (
                  <button
                    className="edit-business-form"
                    onClick={() => setEditForm(true)}
                  >
                    <i className="fa-solid fa-pencil"></i>Edit
                  </button>
                )}

                <Link to={`/businesses/${business.id}`}>
                  <button
                    className="delete-business-form"
                    onClick={handleClick}
                  >
                    <i className="fa-solid fa-trash-can"></i>Delete
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
          <div>{content}</div>
          <button
            className="write-a-review"
            onClick={() => setShowAddReview(true)}
          >
            <i className="fa-regular fa-star star"></i> Write a Review
          </button>
          {showAddReview && (
            <AddReviewForm
              setShow={setShowAddReview}
              businessId={businessId}
              business={business}
            />
          )}
          <Reviews />
        </>
      )}
    </div>
  );
}

export default BusinessDetail;
