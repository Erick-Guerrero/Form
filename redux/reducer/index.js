import {
  GET_ALL_USUARIOS,
  USER_LOGIN_SUCCESS,
} from "../actions/index.js";

const initialState = {
  usuarios: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: action.payload };

    case GET_ALL_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
