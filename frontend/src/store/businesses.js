import { csrfFetch } from "./csrf";

const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES'
const ADD_BUSINESS = 'businesses/ADD_BUSINESS'

const load = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

const add = (businessId) => {
    return {
        type: ADD_BUSINESS,
        business: businessId,
    }
}

export const getBusinesses = () => async (dispatch) => {
    const response = await csrfFetch('/api/businesses');

    if (response.ok) {
        const businesses = await response.json();
        dispatch(load(businesses))
    }
}

export const getOneBusiness = (businessId) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${businessId}`)

    if (response.ok) {
        const business = await response.json();
        dispatch(add(business))
    }
}

const initialState= {
    list:[]
};

const businessesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES:
            const normalizedBusinesses = {};
            action.businesses.forEach(business => {
                normalizedBusinesses[business.id] = business;
            });
            return {
                ...state,
                ...normalizedBusinesses,
            };
        case ADD_BUSINESS:
            console.log('We hit the Reducer!', action.business.id)
            if (!state[action.business.id]) {
                const newState = {
                ...state,
                [action.business.id]: action.business,
            };
            const businessList = newState.list.map((id) => newState[id]);
            businessList.push(action.business);
            return newState;
      }
            return {
            ...state,
            [action.business.id]: {
            ...state[action.business.id],
            ...action.business,
            },
        };
            default:
                return state;
    }
};

export default businessesReducer;
