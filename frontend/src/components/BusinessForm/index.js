import { useEffect, useState } from "react";
import { getBusinesses } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./BusinessForm.css";
import StaticRating from "../RatingsStatic";

function Businesses() {
  const businesses = useSelector((state) => {
    return Object.values(state.businesses);
  });
  const reviews = useSelector((state) => state.reviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

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

  return (
    <>
      <h2 className="all-results">All Results</h2>
      <ul>
        {businesses.map((business) => (
          <Link
            className="businesses-title links"
            to={`/businesses/${business.id}`}
          >
            <div className="businesses-wrapper">
              <li className="businesses-li" key={business.id}>
                <img
                  className="business-image"
                  src={business.businessImage}
                ></img>
                <div className="business-content">
                  <div className="businesses-title links">
                    {business.length}
                    {business.id}. {business.title}
                  </div>
                  <StaticRating className="static-rating" rating={average} />
                  <p className="mock-coffee-and-tea">Coffee & Tea</p>
                  <p className="open">until 8:00 PM</p>

                  <div>"{business.description}"</div>
                  <p className="business-line">
                    _______________________________________________________________________________
                  </p>
                  <button className="start-order">Start Order</button>
                </div>
              </li>
            </div>
          </Link>
        ))}
      </ul>
      <button className="mock-map-search">Redo search in map</button>
      <img
        className="mock-google-map"
        src="https://i.imgur.com/IUg7z2C.png"
      ></img>
      <div className="mock-info-wrapper">
        <p className="mock-info-title filter">Filters</p>
        <div className="price-wrapper">
          <button className="price-button price-left">$</button>
          <button className="price-button">$$</button>
          <button className="price-button">$$$</button>
          <button className="price-button price-right">$$$$</button>
        </div>
        <p className="or-line all-page">__________________</p>
        <p className="mock-info-title">Suggested</p>
        <label class="container">
          Open Now
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Reservations
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Coffee & Tea
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Cafes
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>
        <p className="links blue">See All</p>
        <p className="or-line all-page">__________________</p>
        <p className="mock-info-title">Category</p>
        <div className="category-wrapper">
          <button className="category-button">Coffee & Tea</button>
          <button className="category-button">Breakfast & Brunch</button>
          <div className="category-wrapper-inner">
            <button className="category-button">Specialty Coffee</button>
            <button className="category-button cafe">Cafes</button>
          </div>
        </div>
        <p className="links blue">See All</p>
        <p className="or-line all-page">__________________</p>
        <p className="mock-info-title">Features</p>
        <label class="container">
          Free Wi-Fi
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Outdoor Seating
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Good for Kids
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Accepts Apple Pay
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>
        <p className="links blue">See All</p>
        <p className="or-line all-page">__________________</p>
        <p className="mock-info-title">Neighborhoods</p>
        <label class="container">
          App Academy Headquarters
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          UC San Diego
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Downtown Los Angeles
          <input type="checkbox"></input>
          <span class="checkmark"></span>
        </label>
        <p className="links blue">See All</p>
      </div>
    </>
  );
}

export default Businesses;
