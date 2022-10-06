import axios from "axios"
import { urlConstants } from "../constants"

export const getDashboardList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "dashboardListRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/dashboard/companyKpi`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        dispatch({ type: "dashboardListSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "dashboardListFailure", payload: error.response.data.message })
    }
}
export const getdashboardDetail = (URL) => async (dispatch) => {
    try {
        dispatch({ type: "dashboardDetailRequest" });
        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/dashboard/${URL}`);
        dispatch({ type: "dashboardDetailSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "dashboardDetailFailure", payload: error.response.data.message });
    }
};



