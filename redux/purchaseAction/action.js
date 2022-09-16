import axios from "axios"

const serverUrl = "http://103.107.67.49:8080/api/v2"

export const getPOList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "purchaseOrderRequest" })

        const { data } = await axios.post(`${serverUrl}/purchaseorder/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        dispatch({ type: "purchaseOrderSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "purchaseOrderFailure", payload: error.response.data.message })
    }
}

export const getPODetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: "poDetailRequest" });

        const { data } = await axios.get(`${serverUrl}/purchaseorder/id/${id}`);
        dispatch({ type: "poDetailSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "poDetailFailure", payload: error.response.data.message });
    }
};