import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    CLEAR_ERRORS,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
} from "./userConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../../apiClient";


// register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }

        await apiClient.post(`/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}


// login
export const login = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await apiClient.post(`/api/v1/login`, userData, config);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
        await AsyncStorage.setItem("token", data.token)
    } catch (error) {
        dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
    }
}


// load user
export const loadUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const { data } = await apiClient.get(`/api/v1/me`, config);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}


// export const getProduct = (text) => async (dispatch) => {
//     try {
//         dispatch({ type: ALL_PRODUCT_REQUEST });

//         const token = await AsyncStorage.getItem("token");
//         const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
//         const { data } = await apiClient.get(`/api/v1/users?search=${text}`, config);
//         dispatch({type: ALL_PRODUCT_SUCCESS,payload: data.users})

//     } catch (error) {
//         dispatch({type: ALL_PRODUCT_FAIL, payload: error.response.data.message,})
//     }
// }


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}