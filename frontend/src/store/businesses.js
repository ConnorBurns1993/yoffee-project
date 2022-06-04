import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const LOAD_BUSINESSES = "businesses/LOAD_BUSINESSES";
const ADD_BUSINESS = "businesses/ADD_BUSINESS";
const UPDATE_BUSINESS = "businesses/UPDATE_BUSINESS";
const DELETE_BUSINESS = "businesses/DELETE_BUSINESS";

const load = (businesses) => {
  return {
    type: LOAD_BUSINESSES,
    businesses,
  };
};

const add = (businessId) => {
  return {
    type: ADD_BUSINESS,
    business: businessId,
  };
};

const update = (business) => {
  return {
    type: UPDATE_BUSINESS,
    business,
  };
};

const remove = (businessId) => {
  return {
    type: DELETE_BUSINESS,
    businessId,
  };
};

export const getBusinesses = () => async (dispatch) => {
  const response = await csrfFetch("/api/businesses");

  if (response.ok) {
    const businesses = await response.json();
    dispatch(load(businesses));
  }
};

export const getOneBusiness = (businessId) => async (dispatch) => {
  const response = await csrfFetch(`/api/businesses/${businessId}`);

  if (response.ok) {
    const business = await response.json();
    dispatch(add(business));
  }
};

export const addBusiness = (data) => async (dispatch) => {
  console.log("--- Top of Thunk --- Data: ", data);
  try {
    const response = await csrfFetch("/api/businesses/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("--- After Response in Thunk --- Response: ", response);

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          errorJSON = JSON.parse(error);
        } catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const business = await response.json();
    console.log("---After Successful Response--- Response: ", business);
    dispatch(add(business));
    return business;
  } catch (error) {
    throw error;
  }
};

export const updateBusiness = (business) => async (dispatch) => {
  const response = await csrfFetch(`/api/businesses/${business.id}`, {
    method: "PUT",
    body: JSON.stringify(business),
  });

  if (response.ok) {
    const business = await response.json();
    dispatch(update(business));
  }
};

export const deleteBusiness = (businessId) => async (dispatch) => {
  const response = await csrfFetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });
  console.log("We are hitting the delete thunk");
  if (response.ok) {
    console.log("We are getting an ok respone on the delete thunk");
    const { id } = await response.json();
    dispatch(remove(id));
    return businessId;
  }
};

const initialState = {
  list: [],
};

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUSINESSES:
      const normalizedBusinesses = {};
      action.businesses.forEach((business) => {
        normalizedBusinesses[business.id] = business;
      });
      return {
        ...state,
        ...normalizedBusinesses,
      };

    case ADD_BUSINESS:
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

    case DELETE_BUSINESS:
      const deletedState = { ...state };
      delete deletedState[action.businessId];
      return deletedState;

    case UPDATE_BUSINESS:
      const updatedState = { ...state, [action.business.id]: action.business };
      return updatedState;

    default:
      return state;
  }
};

export default businessesReducer;
