import React, { useState } from "react";
import "./addReviewForm.css";
import { addReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Rating from "../Ratings";

export default function AddReviewForm({ setShow, businessId }) {
  const { id, name } = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [reviewText, setReviewText] = useState("This is a review");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const newReview = {
      description: reviewText,
      rating,
      businessId,
      userId: id,
    };

    await dispatch(addReview(newReview));
    setShow(false);
  };

  return (
    <div className="modal">
      <Rating rating={rating} setRating={setRating} />
      <input
        className="review-textarea"
        type="textarea"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></input>
      <button onClick={() => handleSubmit()}>Submit</button>
      <button onClick={() => setShow(false)}>Cancel</button>
    </div>
  );
}
