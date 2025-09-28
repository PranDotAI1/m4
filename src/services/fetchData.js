import { API_BASE_URL } from "./getBaseAPIUrl";
export const fetchData = async (url, method, payload) => {
    try {
        var queryParams = "";
        const options = {
            method: method,
            headers: {
                'Accept': '*/*',
                'uid': '1',
                'Content-Type': 'application/json',
                'pt': '11',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
            }
        };
        if (method !== 'GET') {
            options.body = JSON.stringify(payload);
        }

        if (method == 'GET') {
            queryParams = new URLSearchParams(payload).toString();
        }
        const response = method == 'GET' ? await fetch(`${API_BASE_URL}/${url}?${queryParams}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }) : await fetch(`${API_BASE_URL}/${url}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
