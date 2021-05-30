import axios from "axios";
import {getUser, setUser} from "../reducers/userReducer";
import jwtDecode from "jwt-decode";

function decodeUser(token) {
    let accessTokenData;
    try {
        accessTokenData = jwtDecode(token)
    } catch (e) {
        return
    }
    return accessTokenData
}

export const authorization = (login, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:8080/login',{
                login,
                password
            })
            dispatch(setUser(decodeUser(response.data.token)))
            localStorage.setItem('token', response.data.token)
        } catch(e) {
            alert(e)
        }
    }
}

export const getUserInfoById = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get('http://localhost:8080/user?id=' + id)
            dispatch(getUser(response.data))
        } catch(e) {
            alert(e)
        }
    }
}