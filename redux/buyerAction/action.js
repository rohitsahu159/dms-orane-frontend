import axios from "axios"
import { urlConstants } from "../constants"

export const getBuyerById = (buyerId) => async (dispatch) => {
    try {
        dispatch({ type: "buyerByIdRequest" })

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/buyers/id/${buyerId}`)

        dispatch({ type: "buyerByIdSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "buyerByIdFailure", payload: error.response.data.message })
    }
}