import { csrfFetch } from "./csrf";

const LOAD_USERS = "/users/LOAD_USERS";

const loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

export const getUsers = () => async (dispatch) => {
  const response = await csrfFetch("/api/users");

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
};

const UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const normalizedUsers = {};
      action.users.forEach((user) => (normalizedUsers[user.id] = user));
      return normalizedUsers;
    default:
      return state;
  }
};

export default UsersReducer;
