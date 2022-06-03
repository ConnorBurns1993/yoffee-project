import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

const load = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const getReviews = (businessId) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${businessId}`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews))
    }
}

const initialState = {}

const reviewsReducer = (state= initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const normalizedReviews = {};
            action.reviews.forEach((review) => {
                normalizedReviews[review.id] = review;
            })
            return {
                ...normalizedReviews,
                ...state,
            };

        default:
            return state;
    }
}

export default reviewsReducer;
