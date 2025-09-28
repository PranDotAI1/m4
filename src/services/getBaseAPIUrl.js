const getApiBaseUrl = () => {
    const { origin } = window.location;
    let apiBaseUrl = '';
    if (origin.includes('localhost')) {
        apiBaseUrl = 'https://backend.pran.ai/';
    }else if (origin.includes('dev')) {
        apiBaseUrl = 'https://backend.pran.ai/';
    } else if (origin.includes('qa')) {
        apiBaseUrl = 'https://backend.pran.ai/';
    } else if (origin.includes('uat')) {
        apiBaseUrl = 'https://backend.pran.ai/';
    } else {
        apiBaseUrl = 'https://backend.pran.ai/';
    }
    return apiBaseUrl;
}

export const API_BASE_URL = getApiBaseUrl();