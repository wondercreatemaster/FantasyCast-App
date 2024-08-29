const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  user: null,
  isLoading: false,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: payload.user.token,
        isLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export const login = (user, token) => ({ type: LOGIN, payload: { user, token } });
export const logout = () => ({ type: LOGOUT });

export default authReducer;