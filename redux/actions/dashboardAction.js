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
        dispatch({ type: "dashboardListFailure", payload: error?.response?.data?.message })
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
export const getdashboardInventoryData = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "dashboardInventoryDataRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/dashboard/inventoryChart`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        dispatch({ type: "dashboardInventoryDataSuccess", payload: data })
        console.log(data)
    } catch (error) {
        dispatch({ type: "dashboardInventoryDataFailure", payload: error.response.data.message })
    }
}
export const getSSList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "sSDataRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/business-partner/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })
        dispatch({ type: "sSDataSuccess", payload: data })
    } catch (error) {
        dispatch({ type: "sSDataFailure", payload: error.response.data.message })
    }
}

export const getdashboardFillRateData = (param) => async (dispatch) => {
    try {
        dispatch({ type: "dashboardFillRateRequest" });
        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/dashboard/fillRateStats?${param}`);
        dispatch({ type: "dashboardFillRateSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "dashboardFillRateFailure", payload: error.response.data.message });
    }
};