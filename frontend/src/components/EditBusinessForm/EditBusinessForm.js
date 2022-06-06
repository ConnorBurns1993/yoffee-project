import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBusiness } from "../../store/businesses";
import { useParams } from "react-router-dom";
import "./EditBusinessForm.css";

const EditBusinessForm = ({ business, hideForm }) => {
  const sessionUser = useSelector((state) => state.session.user);
  // const business = useSelector(state => state.business);
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const [title, setTitle] = useState(business.title);
  const [description, setDescription] = useState(business.description);
  const [address, setAddress] = useState(business.address);
  const [city, setCity] = useState(business.city);
  const [state, setState] = useState(business.state);
  const [zipCode, setZipCode] = useState(business.zipCode);
  // const [latidude, setLatidude] = useState(business.latidude);
  // const [longitude, setLongitude] = useState(business.longitude);
  const [businessImage, setBusinessImage] = useState(business.businessImage);
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateZipCode = (e) => setZipCode(e.target.value);
  // const updateLatidude = (e) => setLatidude(e.target.value);
  // const updateLongitude = (e) => setLongitude(e.target.value);
  const updateBusinessImage = (e) => setBusinessImage(e.target.value);

  //   useEffect(() => {
  //     dispatch(getPokemonTypes());
  //   }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBusiness = {
      ...business,
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

    const updatedBusiness = await dispatch(updateBusiness(newBusiness))
      .then(() => hideForm(true), history.push(`/businesses/${businessId}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    //   if (updatedBusiness) {
    //     history.push(`/businesses/${businessId}`);
    //     hideForm(true);
    //   }
  };

  const handleCancelClick = (e) => {
    hideForm(true);
    history.push(`/businesses/${businessId}`);
  };

  return (
    <section class="edit-form-wrapper">
      <form className="edit-form" onSubmit={handleSubmit}>
        <ul className="errors-edit-business">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          className="login-inputs"
          type="string"
          placeholder="Title"
          min="3"
          required
          value={title}
          onChange={updateTitle}
        />
        <input
          className="login-inputs"
          type="text"
          placeholder="Description"
          min="3"
          max="500"
          required
          value={description}
          onChange={updateDescription}
        />
        <input
          className="login-inputs"
          type="string"
          placeholder="Address"
          min="3"
          max="100"
          required
          value={address}
          onChange={updateAddress}
        />
        <input
          className="login-inputs"
          type="string"
          placeholder="Business Image URL"
          value={businessImage}
          onChange={updateBusinessImage}
        />
        <input
          className="login-inputs"
          type="string"
          placeholder="City"
          value={city}
          onChange={updateCity}
        />
        <input
          className="login-inputs"
          type="string"
          placeholder="State"
          value={state}
          onChange={updateState}
        />
        <input
          className="login-inputs"
          type="string"
          placeholder="Zip Code"
          value={zipCode}
          onChange={updateZipCode}
        />
        <button type="submit" className="login2 update-business">
          Update Business Info
        </button>
        <button
          type="button"
          className="login2 cancel-edit"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default EditBusinessForm;
