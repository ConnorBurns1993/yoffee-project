import { useEffect } from "react";
import { getOneBusiness } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { deleteBusiness } from '../../store/businesses'
import { useHistory } from "react-router-dom";
import EditBusinessFormModal from "../EditBusinessForm/editBusinessModal";
import './BusinessDetail.css'

function BusinessDetail() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const business = useSelector(state => state.businesses[businessId])


    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteBusiness(businessId))
        history.push("/businesses")
    }


    useEffect(() => {
        dispatch(getOneBusiness(businessId))
    }, [dispatch, businessId])

    return (
    <div className='business-id-wrapper'>
    <img alt='' src={business.businessImage}></img>
    <div>{business.title}</div>
    <div>{business.description}</div>
    <div>{business.address}</div>
    <EditBusinessFormModal />
    <button onClick={handleClick}>Delete</button>
    </div>
    )
    }

    export default BusinessDetail;
