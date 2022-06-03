import { useEffect, useState } from "react";
import { getOneBusiness } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { deleteBusiness } from '../../store/businesses'
import { useHistory } from "react-router-dom";
import EditBusinessFormModal from "../EditBusinessForm/editBusinessModal";
import Reviews from "../Reviews";
import './BusinessDetail.css'

function BusinessDetail() {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const business = useSelector(state => state.businesses[businessId])


    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteBusiness(businessId))
        history.push("/businesses")
    }

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
    }, [dispatch]);


    useEffect(() => {
        dispatch(getOneBusiness(businessId))
    }, [dispatch, businessId])

    return (
        <div>
    <div className='business-id-wrapper'>
    <img alt='' src={business.businessImage}></img>
    <div>{business.title}</div>
    <div>{business.description}</div>
    <div>{business.address}</div>
    <EditBusinessFormModal />
    {(business.businessId === sessionUser) ?
    <Link to={`/businesses/${business.id}`}>
    <button onClick={handleClick}>Delete</button>
    </Link> : null }
    </div>
        </div>

    )
    }

    export default BusinessDetail;
