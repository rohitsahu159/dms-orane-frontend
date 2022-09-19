import axios from "axios"

const serverUrl = "http://103.107.67.49:8080/api/v2"

export const getSOList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "salesOrderRequest" })

        const { data } = await axios.post(`${serverUrl}/salesorder`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        console.log("sales order action",data)
        dispatch({ type: "salesOrderSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "salesOrderFailure", payload: error.response.data.message })
    }
}

