const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  user: null,
  isLoading: false,
  isLoggedin: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isLoggedin: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedin: false,
        user: null,
      };
    default:
      return state;
  }
};

export const login = (user) => ({ type: LOGIN, payload: { user } });
export const logout = () => ({ type: LOGOUT });

export default authReducer;