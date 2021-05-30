const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const GET_USER = 'GET_USER';

const defaultState = {
    currentUser: undefined,
    infoUser: undefined,
    isAuth: false,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            };
        case GET_USER:
            return {
                ...state,
                infoUser: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: undefined,
                infoUser: undefined,
                isAuth: false,
            };
        default:
            return state;
    }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
export const getUser = (user) => ({ type: GET_USER, payload: user });
