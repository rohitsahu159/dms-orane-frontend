import axios from "axios";
import { ActionSheetIOS } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { urlConstants } from "../constants";
import Toast from "react-native-toast-message";

export const login = (bodyData) => async (dispatch) => {
    <Toast />
    try {
        dispatch({ type: "loginRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/authentications`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        dispatch({ type: "loginSuccess", payload: data })
        Toast.show({
            type: 'success',
            position: 'top',
            text1: `User Login Successfully`,
            visibilityTime: 2000
        })
    } catch (error) {
        dispatch({ type: "loginFailure", payload: error.response.data.message })
        let message = error.response.data.message
        Toast.show({
            type: 'error',
            position: 'top',
            text1: `${message}`,
            visibilityTime: 2000
        })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: "logoutSuccess" });
    // AsyncStorage.setItem('user', null)
};
