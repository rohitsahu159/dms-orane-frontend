import axios from "axios"
import { urlConstants } from "../constants"

export const getSOList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "salesOrderRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/salesorder/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        dispatch({ type: "salesOrderSuccess", payload: data })
        return data
    } catch (error) {
        dispatch({ type: "salesOrderFailure", payload: error.response.data.message })
    }
}

export const getSODetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: "soDetailRequest" });

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/salesorder/id/${id}`);
        dispatch({ type: "soDetailSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "soDetailFailure", payload: error.response.data.message });
    }
};

