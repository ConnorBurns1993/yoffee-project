import React, { useState } from "react";
import "./addReviewForm.css";
import { addReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Rating from "../Ratings";
import { useHistory } from "react-router-dom";

export default function AddReviewForm({ setShow, businessId, business }) {
  const { id, name } = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    const newReview = {
      description: reviewText,
      rating,
      businessId,
      userId: id,
    };

    dispatch(addReview(newReview))
      .then(() => history.push(`/businesses/${businessId}`), setShow(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleClick = (e) => {
    history.push(`/businesses/${businessId}`);
  };

  return (
    <div className="modal">
      <div className="mock-header"></div>
      <NavLink exact to="/">
        <img
          src="https://i.imgur.com/WNhN3BB.png"
          className="mock-header-img"
          alt=""
        ></img>
      </NavLink>
      <h2
        className="review-business-title"
        style={{ cursor: "pointer" }}
        onClick={() => handleClick()}
      >
        {business.title}
      </h2>
      <ul className="errors-reviews">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="rating-wrapper">
        <Rating rating={rating} setRating={setRating} />
        <div className="select-your-rating">Select your rating</div>
      </div>
      <textarea
        className="review-textarea"
        placeholder="The ambiance here was unmatched. I came here to grab a coffee and study for my midterm, and Sarah was so sweet when she took my order! The only thing I would change is that I wish my coffee could have been a little warmer..."
        onFocus={(e) => (e.target.placeholder = "")}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      <button className="post-review" onClick={() => handleSubmit()}>
        Post Review
      </button>
    </div>
  );
}
