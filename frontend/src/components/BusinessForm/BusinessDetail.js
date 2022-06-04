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
            <img alt="" src={business.businessImage}></img>
            <StaticRating rating={reviews.rating} />
            <div>{business.title}</div>
            <div>{business.description}</div>
            <div>{business.address}</div>
            {business.ownerId === sessionUser.id ? (
              <div>
                {!editForm && (
                  <button onClick={() => setEditForm(true)}>Edit</button>
                )}

                <Link to={`/businesses/${business.id}`}>
                  <button onClick={handleClick}>Delete</button>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="edit-business">{content}</div>
          <button onClick={() => setShowAddReview(true)}>Add Review</button>
          {showAddReview && (
            <AddReviewForm setShow={setShowAddReview} businessId={businessId} />
          )}
          <Reviews />
        </>
      )}
    </div>
  );
}

export default BusinessDetail;
