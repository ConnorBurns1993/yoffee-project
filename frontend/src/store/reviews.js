import { ValidationError } from '../utils/validationError'
import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const load = (reviews) => {
    return {
    type: LOAD_REVIEWS,
    reviews
    }
 }

const add = (reviewId) => {
    return {
        type: ADD_REVIEW,
        review: reviewId,
    }
}

const update = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const remove = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const getReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews))
    }
}

export const getOneReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`)

    if (response.ok) {
        const review = await response.json();
        dispatch(add(review))
    }
}

export const addReview = (data) => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/reviews/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });

        if (!response.ok) {
            let error;
            if (response.status === 422) {
                error = await response.json();
                throw new ValidationError(error.errors, response.statusText);
            } else {
                let errorJSON;
                error = await response.text();
                try {
                    errorJSON = JSON.parse(error)
                } catch {
                    throw new Error(error);
                }
                throw new Error(`${errorJSON.title}: ${errorJSON.message}`)

            }
        }

        const review = await response.json()
        dispatch(add(review));
        return review;

    } catch (error) {
        throw error
    }
};

export const updateReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(update(review))
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' })
    if (response.ok) {
        const { id } = await response.json()
        dispatch(remove(id))
        return reviewId;
    }
}

const initialState = {
    list : []
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_REVIEWS:
            const normalizedReviews = {};
            action.reviews.forEach(review => {
                normalizedReviews[review.id] = review;
            });
            return {
                ...state,
                ...normalizedReviews,
            };

        case ADD_REVIEW:
            if (!state[action.review.id]) {
                const newState = {
                ...state,
                [action.review.id]: action.review,
            };
            const reviewList = newState.list.map((id) => newState[id]);
            reviewList.push(action.review);
            return newState;
      }
            return {
            ...state,
            [action.review.id]: {
            ...state[action.review.id],
            ...action.review,
            },
        };

        case DELETE_REVIEW:
            const deletedState = {...state};
            delete deletedState[action.reviewId]
            return deletedState;

        case UPDATE_REVIEW:
            const updatedState = { ...state, [action.review.id]: action.review}
            return updatedState;

        default:
            return state;
    }
};


export default reviewsReducer;
