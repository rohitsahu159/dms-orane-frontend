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

export const getBuyerList = (referenceId) => async (dispatch) => {
    try {
        dispatch({ type: "buyersRequest" })

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/buyers?sellerReferenceId=${referenceId}`)
        let temp = await data.data.buyers.map(e => {
            return {
                ...e,
                key: e.id,
                value: e.companyName,
            }
        });
        dispatch({ type: "buyersSuccess", payload: temp })
    } catch (error) {
        dispatch({ type: "buyersFailure", payload: error.response.data.message })
    }
}