import axios from "axios"
import { urlConstants } from "../constants"

export const getProducts = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "productRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/products/price/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        dispatch({ type: "productSuccess", payload: data })
        return data
    } catch (error) {
        dispatch({ type: "productFailure", payload: error.response.data.message })
    }
}

export const getAllProducts = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "allProductRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/products/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        dispatch({ type: "allProductSuccess", payload: data })
        return data
    } catch (error) {
        dispatch({ type: "allProductFailure", payload: error.response.data.message })
    }
}

export const getProuctDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: "productDetailRequest" });

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/products/id/${id}`);
        dispatch({ type: "productDetailSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "productDetailFailure", payload: error.response.data.message });
    }
};