import { useEffect } from "react";
import { getBusinesses } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

function Businesses() {
const businesses = useSelector(state => {
    return Object.values(state.businesses)
})

const dispatch = useDispatch();

useEffect(() => {
    dispatch(getBusinesses())
}, [dispatch])

return businesses.map((business) => (
    <>
    <img src={business.businessImage}></img>
    <Link to={`/businesses/${business.id}`}>{business.title}</Link>
    <div>{business.description}</div>
    <div>{business.address}</div>
    </>
))



}

export default Businesses;
