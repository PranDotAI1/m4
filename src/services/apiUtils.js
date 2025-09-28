import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ABMD_PUBLIC_KEY,  API_BASE_URL } from "../config";

export const encryptString = async (plainText) => {

    try {
        const keyData = ABMD_PUBLIC_KEY
            .replace(/-----BEGIN PUBLIC KEY-----/, "")
            .replace(/-----END PUBLIC KEY-----/, "")
            .replace(/\n/g, "");
        const binaryDer = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
        const publicKey = await window.crypto.subtle.importKey(
            "spki",
            binaryDer.buffer,
            {
                name: "RSA-OAEP",
                hash: { name: "SHA-1" },
            },
            true,
            ["encrypt"]
        );

        const encoder = new TextEncoder();
        const encodedData = encoder.encode(plainText);
        const encryptedData = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            encodedData
        );

        const encryptedBase64 = btoa(
            String.fromCharCode(...new Uint8Array(encryptedData))
        );
        return encryptedBase64;
    } catch (err) {
        console.error("Encryption Error:", err);
        throw new Error("Failed to encrypt string.");
    }
};

export const createSession = async () => {
    try {
        const url = `${API_BASE_URL}/abha/token`;
        const param = {};
        const header = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.post(url, 'POST', param, header);
        return response.data;
    } catch (error) {
        console.error("Session Creation Error:", error);
        throw new Error("Failed to create session.");
    }
};

export const getAbhaProfile = async (accessToken, x_token) => {
    try {
        const url = `${API_BASE_URL}/abha/profile`;
        const param = {};
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'xtoken': `${x_token}`,
                'accesstoken': `${accessToken}`,
            },
        };
        const response = await axios.get(url, header);
        return response.data;
    } catch (error) {
        console.error("Session Creation Error:", error);
        throw new Error("Failed to create session.");
    }
};

export const verifyUser = async (accessToken, x_token, abhano, txnId) => {
    const url = `${API_BASE_URL}/abha/account/verify`;
        const param = {
            txnId : txnId,
            abhanumber : abhano
        };
        const header = {
            headers: {
                'Content-Type': 'application/json',
                't-token': `${x_token}`,
                'accesstoken': `${accessToken}`,
            },
        };
        const response = await axios.post(url, param, header);
        return response.data;
};

/**
 * image file base64 encode encription 
 * @param {*} file
 * @returns  
 */
export const encryptFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // remove "data:image/jpeg;base64,"
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Function use to logout
 * @param {*} navigate
 * @returns 
 */
export const userLogout = (navigate) => {
    // use navigate here
    // Clear local storage
    localStorage.removeItem("orignalBeneficiaryData");
    localStorage.removeItem("abhaProfileData");
    localStorage.removeItem("abdmAccessToken");
    localStorage.removeItem("x_token");
    navigate('/login-ABHA');
};