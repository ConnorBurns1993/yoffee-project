import { useEffect } from "react";
import { getOneBusiness } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import './BusinessDetail.css'

function BusinessDetail() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    const business = useSelector(state => state.businesses[businessId])


    useEffect(() => {
        dispatch(getOneBusiness(businessId))
    }, [dispatch, businessId])

    return (
    <div className='business-id-wrapper'>
    <img alt='' src={business.businessImage}></img>
    <div>{business.title}</div>
    <div>{business.description}</div>
    <div>{business.address}</div>
    </div>
    )
    }

    export default BusinessDetail;
