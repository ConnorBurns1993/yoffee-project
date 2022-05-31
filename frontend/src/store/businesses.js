import { csrfFetch } from "./csrf";

const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES'

const load = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

export const getBusinesses = () => async (dispatch) => {
    const response = await csrfFetch('/api/businesses');

    if (response.ok) {
        const businesses = await response.json();
        dispatch(load(businesses))
    }
}

const initialState= {};

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
            default:
                return state;
    }
};

export default businessesReducer;
