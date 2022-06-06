import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import { useSelector } from "react-redux";
import "./recentActivity.css";

export default function RecentActivity() {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  console.log(reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  return (
    <>
      <h2 className="recent-activity">Recent Activity</h2>
      <div className="recent-activity-container">
        {reviews &&
          Object.values(reviews).map((review) => (
            <div className="card">
              <div className="card-author"></div>
              <div></div>
            </div>
          ))}
      </div>
    </>
  );
}
