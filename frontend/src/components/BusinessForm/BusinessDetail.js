import { useEffect } from "react";
import { getOneBusiness } from "../../store/businesses";
import { getBusinesses } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

function BusinessDetail() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    console.log('Business Id:', businessId)
    const business = useSelector(state => state.businesses)


    useEffect(() => {
        dispatch(getOneBusiness(businessId))
    }, [dispatch, businessId])

    return (
    <>
    <img alt='' src={business.businessImage}></img>
    <div>{business.title}</div>
    <div>{business.description}</div>
    <div>{business.address}</div>
    <div>Hello World</div>
    </>
    )
    }

    export default BusinessDetail;
