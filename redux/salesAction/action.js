import axios from "axios"

const serverUrl = "http://103.107.67.49:8080/api/v2"

export const getSOList = (bodyData) => async (dispatch) => {
    console.log("sadksahdksadksahkdh", bodyData)
    try {
        dispatch({ type: "salesOrderRequest" })

        const { data } = await axios.post(`${serverUrl}/salesorder/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        dispatch({ type: "salesOrderSuccess", payload: data })
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

