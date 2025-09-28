import React from "react";
import { API_BASE_URL } from "../services/getBaseAPIUrl";
import axios from 'axios';

export const verifyUser = async (accessToken, x_token, abhano, txnId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}api/user/abdm-mobileapi-linkId`,
            {
                "healthIdNumber": `${abhano}`,
                "txnId": `${txnId}`,
                "token": `${x_token}`,
                'authtoken': `${accessToken}`
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Session Creation Error:", error);
        throw new Error("Failed to create session.");
    }
};