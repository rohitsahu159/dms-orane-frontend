import axios from "axios"
import { urlConstants } from "../constants"

export const getSeller = (referenceId) => async (dispatch) => {
    try {
        dispatch({ type: "sellerRequest" })

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/sellers?${referenceId}`)
        // data.data.sellers.map(e => {
        //     return {
        //         ...e,
        //         key: e.id,
        //         value: e.companyName,
        //     }
        // });
        // console.log(data)
        dispatch({ type: "sellerSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "sellerFailure", payload: error.response.data.message })
    }
}