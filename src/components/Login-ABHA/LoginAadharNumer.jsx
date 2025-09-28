import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import { encryptString, createSession, getAbhaProfile } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from "../../config";
import { toast, ToastContainer } from 'react-toastify';
import DeactivatePopup from "../../components/Forgot-ABHA/Account-deactivate-popup";

const LoginAadharNumber = () => {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [formateAadhar, setFormateAadhar] = useState("");
    const [aadharno, setAadharno] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accessToken, setaccessToken] = useState("");
    const [aadharEncrpt, setEncrptAadhar] = useState("");
    const [txnId, settxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showDeactivateMessage, setShowDeactivateMessage] = useState("");

    const navigate = useNavigate();

    const { getDataByKey } = useContext(GlobalContext);
    const back = getDataByKey('backfunction');

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    /**
     * function used to formate ABHA no. in input box
     */
    const handleFormateAadhar = (e) => {
        const inputValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, "");

        // Format the value as xx-xxxx-xxxx-xxxx
        const formattedValue = numericValue.replace(
            /^(\d{0,4})(\d{0,4})(\d{0,4}).*/,
            (match, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join("-")
        );

        // Update state
        setFormateAadhar(formattedValue);
        setAadharno(numericValue);
    };
    /**
     * Function used to set otp text
     */
    const handleOtpChange = (e) => {
        const value = e.target.value;
        // Allow only digits and up to 6 characters
        if (/^\d{0,6}$/.test(value)) {
            setOtpText(value);
        }
    };
    const sendOtpRequest = async (encryptedAadhar) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/abha/api/v3/profile/login/request/otp`,
                {
                    "scope": [
                        "abha-login",
                        "aadhaar-verify"
                    ],
                    "loginHint": "aadhaar",
                    "loginId": encryptedAadhar,
                    "otpSystem": "aadhaar"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'REQUEST-ID': uuidv4(),
                        'TIMESTAMP': new Date().toISOString(), // Generate the current timestamp dynamically
                        'Authorization': `Bearer ${accessToken}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("Server responded with a status:", error.response.status);
                console.error("Response data:", error.response.data);
            } else if (error.request) {
                console.error("Request was made, but no response received:", error.request);
            } else {
                console.error("Error in setting up the request:", error.message);
            }
        }

    };

    // Trigger when accessToken changes
    useEffect(() => {
        const sendOtpIfReady = async () => {
            if (accessToken && aadharEncrpt) {
                try {
                    const response = await sendOtpRequest(aadharEncrpt);
                    if (response?.txnId) {
                        setErrorMessage(response.message);
                        settxnId(response.txnId);
                        setShowOtpBox(true);
                        setIsPageLoading(false);
                        setResendTimer(60); // Example: 60 seconds
                    }
                } catch (error) {
                    if (error?.message) {
                        setErrorMessage(error.message);
                    } else {
                        setErrorMessage("Something went wrong!!");
                    }
                    setIsPageLoading(false);
                } finally {
                    setIsPageLoading(false);
                }
            }
        };
        sendOtpIfReady();
    }, [accessToken, aadharEncrpt]);

    // Countdown logic using useEffect
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [resendTimer]);

    /**
     * function used to send otp for abha verification
     */
    const handleSendOtp = async (event) => {
        event.preventDefault();
        setIsPageLoading(true);
        try {
            // Encrypt Aadhaar
            const encryptedAadharNo = await encryptString(aadharno);
            if (encryptedAadharNo) {
                const sessionResponse = await createSession();
                if (sessionResponse?.accessToken) {

                    const url = `${API_BASE_URL}/abha/login/aadhar/send-otp`;
                    const param = {
                        aadharNumber: encryptedAadharNo,
                    };
                    const accessToken = sessionResponse.accessToken;
                    setaccessToken(accessToken);
                    const header = {
                        headers: {
                            'Content-Type': 'application/json',
                            'accesstoken': sessionResponse.accessToken,
                        },
                    };
                    const response = await axios.post(url, param, header);
                    const dtResponse = response.data;
                    if (dtResponse.success) {
                        settxnId(dtResponse.data?.txnId);
                        setShowOtpBox(true);
                        setResendTimer(60); // Example: 60 seconds
                        toast.success(dtResponse?.data.message || "OTP sent successfully.");
                        setIsPageLoading(false);
                    } else {
                        toast.error(dtResponse?.message || "Failed to send OTP. Please try again.");
                        setIsPageLoading(false);
                    }
                } else {
                    toast.error("Session creation failed. Please try again.");
                    setIsPageLoading(false);
                }
            } else {
                toast.error("Failed to encrypt ABHA number. Please try again.");
            }
        } catch (error) {
            setIsPageLoading(false);
            // Backend returned an error response
            if (error.response.data.success === false && error.response.data.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        }
    };
    /**
     * Functin used to verify abha number
     */
    /**
   * Functin used to verify abha number
   */
    const verifyOtp = async (event) => {
        event.preventDefault();
        setIsPageLoading(true);
        try {
            const encryptedOtp = await encryptString(OtpText);
            if (encryptedOtp) {
                const url = `${API_BASE_URL}/abha/login/aadhar/verify-otp`;
                const param = {
                    txnId: txnId,
                    otp: encryptedOtp,
                };
                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        'accesstoken': accessToken,
                    },
                };
                const response = await axios.post(url, param, header);
                const dtResponse = response.data;
                console.log("dtResponse", dtResponse);
                if (dtResponse.success) {
                    if (dtResponse.data.authResult === 'success') {
                        console.log(response.data);
                        localStorage.setItem("x_token", dtResponse.data.token);
                        // get ABHA profile data    
                        const abhaProfileData = await getAbhaProfile(accessToken, dtResponse.data.token);
                        if (abhaProfileData?.success) {
                            localStorage.setItem("orignalBeneficiaryData", JSON.stringify(abhaProfileData?.data));
                            localStorage.setItem("abhaProfileData", JSON.stringify(abhaProfileData));
                            setIsPageLoading(false);
                            navigate("/abha-Card");
                        } else {
                            toast.error(abhaProfileData?.message || "Failed to fetch ABHA profile data. Please try again.");
                            setIsPageLoading(false);
                            return;
                        }
                    } else {
                        toast.error(dtResponse?.data?.message || "Wrong OTP. Please try again.");
                        setIsPageLoading(false);
                        return;
                    }

                } else {
                    toast.error(dtResponse?.data?.message || "Failed to verify OTP. Please try again.");
                    setIsPageLoading(false);
                }
            } else {
                toast.error("Failed to encrypt OTP. Please try again.");
                setIsPageLoading(false);
            }
        } catch (error) {
            setIsPageLoading(false);
            // Backend returned an error response
            if (error.response.data.success === false && error.response.data.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else if (error.response.data.success === false && error.response.data.message === "This account is deactivated. Please continue to reactivate.") {
                setShowDeactivateMessage(error.response.data.message);
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        }
    };
    return (

        <>
            {showDeactivateMessage && <DeactivatePopup onClose={() => setShowDeactivateMessage("")} showDeactivateMessage={showDeactivateMessage} />}
            <ToastContainer />
            {isPageLoading && <Loader />}
            <div className="flow-feilds aadharCardLogin">
                {errorMessage && (
                    <p className="notes">{errorMessage}</p>
                )}
                {!showOtpBox && (
                    <div className="feilds">
                        <label>Aadhar Number</label>
                        <input type="text" className="filds-form" placeholder="2001 - 3001 - 4001"
                            value={formateAadhar}
                            autoComplete="off"
                            onChange={handleFormateAadhar} />
                    </div>
                )}
                {showOtpBox && (
                    <div className="feilds">
                        <label>Confirm OTP</label>
                        <input type="text" className="filds-form" placeholder="Enter OTP" maxLength={6} value={OtpText} onChange={handleOtpChange} />
                        <span className="notes text-end"
                            style={{
                                pointerEvents: resendTimer > 0 ? "none" : "auto",
                                color: resendTimer > 0 ? "#999" : "#007bff",
                                cursor: resendTimer > 0 ? "not-allowed" : "pointer"
                            }}
                        >{resendTimer > 0 ? '00:' + resendTimer + ' Resend OTP' : 'Resend OTP ?'} </span>
                    </div>
                )}
            </div>
            {!showOtpBox && (
                <label className="terms-condition-section" for="termsConditionClick">
                    <input type="checkbox" id="termsConditionClick" value="1" onClick={handleCheckboxChange} />
                    <div className="terms-condition-right">
                        <h4>I agree to Terms and Conditions</h4>
                        <p>I, hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, with National Health Authority (NHA)...  </p>
                        <span className="readMore">Read More</span>
                    </div>
                </label>
            )}
            <div className="flow-feilds" style={{ minHeight: 'auto' }}>
                <div className="feilds feildsBtn">
                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                    <button className={`custBtn ${(formateAadhar.length == 14 && isChecked) ? 'btnSuccess' : 'disabled'}`} disabled={formateAadhar.length !== 14 || !isChecked} onClick={!showOtpBox ? handleSendOtp : verifyOtp}> {!showOtpBox ? 'Submit' : 'Verify'} <i className="material-icons">arrow_right_alt</i></button>
                </div>
            </div>
        </>
    )
}

export default LoginAadharNumber


