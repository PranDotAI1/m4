import { ACTION_TYPE } from "../AppConstant/Enumeration";
import { fetchData } from "./fetchData";

export const ApiService = async (payload, actionType, action) => {
    const isNew = isNewFetchDataCall(action);
    const url = getActionTypeURL(action);
    const data = isNew && await fetchData(url, actionType, payload);
    return data;
}

const getActionTypeURL = (action) => {
    switch (action) {
        case ACTION_TYPE.auth:
            return 'usermanagement/api/1/login/auth';
            break;
        default:
            break;
    }
}

const isNewFetchDataCall = (url) => {
    const urlPart = url.split('/');
    const actaulUrl = urlPart[0];
    const fetchNewDataApi = [
        ACTION_TYPE.auth,
    ];
    if (fetchNewDataApi.indexOf(actaulUrl) > -1) {
        return true;
    }
    return false;
}


