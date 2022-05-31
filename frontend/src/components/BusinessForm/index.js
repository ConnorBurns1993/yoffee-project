import { useEffect } from "react";
import { getBusinesses } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";


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
    <div>{business.title}</div>
    <div>{business.description}</div>
    <div>{business.address}</div>
    </>
))



}

export default Businesses;
