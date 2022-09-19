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
    } catch (error) {
        dispatch({ type: "productFailure", payload: error.response.data.message })
    }
}