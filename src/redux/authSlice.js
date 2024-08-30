const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  user: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const login = (user) => ({ type: LOGIN, payload: { user } });
export const logout = () => ({ type: LOGOUT });

export default authReducer;