import axios from "axios";
import { ActionSheetIOS } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const serverUrl = "http://103.107.67.49:8080/api/v2"

export const login = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" })

        const { data } = await axios.post(`${serverUrl}/authentications`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        AsyncStorage.setItem('user', JSON.stringify(data))
        dispatch({ type: "loginSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "loginFailure", payload: error.response.data.message })
    }
}

export const logout = () => async (dispatch) => {
        dispatch({ type: "logoutSuccess" });
        AsyncStorage.setItem('user', null)
};
