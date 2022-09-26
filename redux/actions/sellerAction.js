import axios from "axios"
import { urlConstants } from "../constants"

export const getSeller = (referenceId) => async (dispatch) => {
    try {
        dispatch({ type: "sellerRequest" })

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/sellers?${referenceId}`)
        let temp = await data.data.sellers.map(e => {
            return {
                ...e,
                key: e.id,
                value: e.companyName,
            }
        });
        dispatch({ type: "sellerSuccess", payload: temp })
    } catch (error) {
        dispatch({ type: "sellerFailure", payload: error.response.data.message })
    }
}