import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBusiness } from "../../store/businesses";
import './AddBusiness.css'

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

    const newBusiness = { // payload
      ownerId: sessionUser.id,
      title,
      description,
      address,
      city,
      state,
      zipCode,
    //   latidude,
    //   longitude,
      businessImage
    };

    dispatch(addBusiness(newBusiness)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (errors.length < 0 && newBusiness) {
      history.push("/businesses");
    };
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/businesses");
  };

  return (
    <div className='add-business-wrapper'>
      <form className="add-business-form" onSubmit={(e) => handleSubmit(e)}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>Business Name:</label>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}>
        </input>
        <label>Description:</label>
        <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}>
        </input>
        <label>Address:</label>
        <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}>
        </input>
        <label>Business Image:</label>
        <input
        value={businessImage}
        onChange={(e) => setBusinessImage(e.target.value)}>
        </input>
        <label>City:</label>
        <input
        value={city}
        onChange={(e) => setCity(e.target.value)}>
        </input>
        <label>State:</label>
        <input
        value={state}
        onChange={(e) => setState(e.target.value)}>
        </input>
        <label>Zip Code:</label>
        <input
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}>
        </input>
        <label>Latitude:</label>
        <input
        value={latidude}
        onChange={(e) => setLatidude(e.target.value)}>
        </input>
        <label>Longitude:</label>
        <input
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}>
        </input>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddBusinessForm;
