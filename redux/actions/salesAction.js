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
        dispatch({ type: "salesOrderFailure", payload: error.response.data })
        return error.response
    }
}

export const getSODetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: "soDetailRequest" });

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/salesorder/id/${id}`);
        dispatch({ type: "soDetailSuccess", payload: data });
        return data
    } catch (error) {
        dispatch({ type: "soDetailFailure", payload: error.response.data });
    }
};

export const createSO = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "createSORequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/salesorder`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        dispatch({ type: "createSOSuccess", payload: data })
        return data
    } catch (error) {
        dispatch({ type: "createSOFailure", payload: error.response.data.message })
    }
}

export const getSIList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "salesInvoiceRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/salesinvoice/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        dispatch({ type: "salesInvoiceSuccess", payload: data })
        return data
    } catch (error) {
        dispatch({ type: "salesInvoiceFailure", payload: error.response.data })
        return error.response
    }
}

export const getSIDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: "siDetailRequest" });

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/salesinvoice/id/${id}`);
        dispatch({ type: "siDetailSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "siDetailFailure", payload: error.response.data });
    }
};

