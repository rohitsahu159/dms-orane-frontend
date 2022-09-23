import axios from "axios";
import { ActionSheetIOS } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { urlConstants } from "../constants"

export const login = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/authentications`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        // AsyncStorage.setItem('user', JSON.stringify(data))
        dispatch({ type: "loginSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "loginFailure", payload: error.response.data.message })
    }
}

export const logout = () => async (dispatch) => {
        dispatch({ type: "logoutSuccess" });
        // AsyncStorage.setItem('user', null)
};
