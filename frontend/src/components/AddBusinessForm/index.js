import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBusiness } from "../../store/businesses";
import { NavLink } from "react-router-dom";
import "./AddBusiness.css";

const AddBusinessForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [latidude, setLatidude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [businessImage, setBusinessImage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBusiness = {
      ownerId: sessionUser.id,
      title,
      description,
      address,
      city,
      state,
      zipCode,
      //   latidude,
      //   longitude,
      businessImage,
    };

    dispatch(addBusiness(newBusiness)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (errors.length <= 0 && newBusiness) {
      history.push("/businesses");
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      <div className="mock-header">
        <NavLink exact to="/">
          <img
            src="https://i.imgur.com/WNhN3BB.png"
            alt=""
            className="mock-header-img"
          ></img>
        </NavLink>
      </div>
      <form className="add-business-form" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="log-in-to-yoffee2">Add your Business to Yoffee</h2>
        <div className="new-to-yoffee3">
          Changed your mind?{" "}
          <NavLink to="/" className="links">
            Cancel
          </NavLink>
        </div>
        <div className="tos">
          By creating your business, you agree to Yoffee's{" "}
          <NavLink to="/businesses/create" className="links">
            Terms of Service
          </NavLink>{" "}
          and{" "}
          <NavLink to="/businesses/hey/create" className="links">
            Privacy Policy.
          </NavLink>
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          className="login-inputs"
          placeholder="Business Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          className="login-inputs"
          placeholder="Brief Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          placeHolder="Business Address"
          className="login-inputs"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          placeholder="Business Image URL"
          className="login-inputs"
          value={businessImage}
          onChange={(e) => setBusinessImage(e.target.value)}
        ></input>
        <input
          placeholder="City"
          className="login-inputs"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <input
          placeholder="State"
          className="login-inputs"
          value={state}
          onChange={(e) => setState(e.target.value)}
        ></input>
        <input
          placeholder="Zip Code"
          className="login-inputs"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        ></input>
        {/* <label>Latitude:</label> */}
        {/* <input
        value={latidude}
        onChange={(e) => setLatidude(e.target.value)}>
        </input>
        <label>Longitude:</label>
        <input
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}>
        </input> */}
        <button className="login3" type="submit">
          Submit
        </button>
        <button className="login3" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
      <img
        className="coffee-art-create-business"
        src="https://st2.depositphotos.com/1033554/12390/i/950/depositphotos_123909404-stock-photo-3d-rendering-of-a-coffee.jpg"
        alt=""
      ></img>
      <div className="footer-wrapper-signup">
        <div className="footer-1">
          <div className="footer-title">About</div>
          <div className="footer-title">Discover</div>
          <div className="footer-title">Connor For Business</div>
        </div>
        <div className="footer-2">
          <a
            href="https://www.google.com/gmail/about/"
            target="_blank"
            rel="noreferrer"
            className="footer-content email links"
            alt=""
          >
            Email
          </a>
          <a
            href="https://github.com/ConnorBurns1993"
            target="_blank"
            rel="noreferrer"
            className="footer-content github links"
            alt=""
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/connor-burns-647766194/"
            target="_blank"
            rel="noreferrer"
            className="footer-content linkedin links"
            alt=""
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
};

export default AddBusinessForm;
