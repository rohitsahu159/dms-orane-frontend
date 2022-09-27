import axios from "axios"
import { urlConstants } from "../constants"
import Toast from "react-native-toast-message";

export const getPOList = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "purchaseOrderRequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/purchaseorder/filtered`, JSON.stringify(bodyData), {
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

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/purchaseorder/id/${id}`);
        dispatch({ type: "poDetailSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "poDetailFailure", payload: error.response.data.message });
    }
};

export const getPOMasterData = () => async (dispatch) => {
    try {
        dispatch({ type: "poMasterDataRequest" });

        const { data } = await axios.get(`${urlConstants.BASE_URI_DEV}/master-data/po-master`);
        dispatch({ type: "poMasterDataSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "poMasterDataFailure", payload: error.response.data.message });
    }
};

export const createPO = (bodyData) => async (dispatch) => {
    try {
        dispatch({ type: "createPORequest" })

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/purchaseorder`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        dispatch({ type: "createPOSuccess", payload: data })
        return data
    } catch (error) {
        dispatch({ type: "createPOFailure", payload: error.response.data.message })
    }
}