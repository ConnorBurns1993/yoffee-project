import { useEffect } from "react";
import { getBusinesses } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import './BusinessForm.css'

function Businesses() {
const businesses = useSelector(state => {
    return Object.values(state.businesses)
})

const dispatch = useDispatch();

useEffect(() => {
    dispatch(getBusinesses())
}, [dispatch])

return (
<>
    <h2 className='all-results'>All Results</h2>
    <ul>
    {businesses.map((business) => (
        <Link className='businesses-title links' to={`/businesses/${business.id}`}><div className='businesses-wrapper'>
        <li className='businesses-li' key={business.id}>
        <img className='business-image' src={business.businessImage}></img>
        <div className="business-content"><div className='businesses-title links'>{business.title}</div>
        <div>{business.description}</div>
        <div>{business.address}</div>
        </div>
        </li>
        </div>
        </Link>
        ))}
</ul>
</>
)
}

export default Businesses;
