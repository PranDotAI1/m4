import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import { encryptString, createSession, getAbhaProfile, verifyUser } from "../../services/apiUtils";
import Loader from '../common/Loader';
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import DeactivatePopup from "../Forgot-ABHA/Account-deactivate-popup";

const LoginMobileNumber = () => {

    const [showOtpBox, setShowOtpBox] = useState(false);
    const [mobile, setMobile] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accessToken, setaccessToken] = useState("");
    const [txnId, settxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [isVerified, setVerified] = useState(false);
    const [showDeactivateMessage, setShowDeactivateMessage] = useState("");

    const { getDataByKey } = useContext(GlobalContext);
    const back = getDataByKey('backfunction');

    const navigate = useNavigate();

    /**
     * function used to formate ABHA no. in input box
     */
    const handleMobileChange = (e) => {
        const inputValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, "");
        setMobile(numericValue);
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
    const handleSendOtp = async () => {
        if (!mobile || mobile.length !== 10) {
            toast.error("Please enter valid mobile number");
        } else {
            setIsPageLoading(true);
            const encyptMobile = await encryptString(mobile);
            if (!encyptMobile) {
                toast.error("Encryption failed. Please try again.");
            } else {
                try {
                    const sessionResponse = await createSession();

                    if (sessionResponse?.accessToken) {
                        const url = `${API_BASE_URL}/abha/login/mobile/send-otp`;
                        const param = {
                            mobileNumber: encyptMobile,
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
                } catch (error) {
                    setIsPageLoading(false);
                    // Backend returned an error response
                    if (error.response.data.success === false && error.response.data.message === "Unclassified Authentication Failure") {
                        toast.error(error.response.data.message + ". Please try again!");
                    } else {
                        toast.error(error.response.data.message || "Server error occurred. Please try again later.");
                    }
                }
            }
        }
    };
    /**
     * Functin used to verify abha number
     */

    const verifyMobileOtp = async () => {
        try {
            if (!OtpText) {
                toast.error("Please enter OTP.");
            } else {
                setIsPageLoading(true);
                const encryptedOtp = await encryptString(OtpText);
                if (encryptedOtp) {
                    const sessionResponse = await createSession();
                    if (sessionResponse?.accessToken) {

                        const accessToken = sessionResponse.accessToken;
                        setaccessToken(accessToken);

                        const url = `${API_BASE_URL}/abha/login/mobile/verify-otp`;
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
                        if (dtResponse.success) {
                            setVerified(true);
                            if (dtResponse.data.authResult === 'success') {
                                const verifyuser = await verifyUser(accessToken, dtResponse.data.token, dtResponse.data.accounts[0].ABHANumber, dtResponse.data.txnId);
                                console.log("verifyuser", verifyuser, "x_token", verifyuser.data.token);
                                if (verifyuser.success) {

                                    localStorage.setItem("x_token", verifyuser.data.token);
                                    console.log("verifyUserObj", verifyuser);
                                    // get ABHA profile data    
                                    const abhaProfileData = await getAbhaProfile(accessToken, verifyuser.data.token);
                                    console.log("abhaProfileData", abhaProfileData);
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
                                    toast.error(verifyuser?.message || "Failed to verify user. Please try again.");
                                    setIsPageLoading(false);
                                }
                            } else {
                                toast.error(dtResponse?.data?.message || "Wrong OTP. Please try again.");
                                setIsPageLoading(false);
                                return;
                            }

                        } else {
                            toast.error(dtResponse?.message || "Failed to verify OTP. Please try again.");
                            setIsPageLoading(false);
                        }
                    } else {
                        toast.error("Session creation failed. Please try again.");
                        setIsPageLoading(false);
                    }
                } else {
                    setIsPageLoading(false);
                    toast.error("Encryption failed. Please try again.");
                }
            }
        } catch (error) {
            setIsPageLoading(false);
            // Backend returned an error response
            if (error.response?.data?.success === false && error.response?.data?.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else if (error.response?.data?.success === false && error.response?.data?.message === "This account is deactivated. Please continue to reactivate.") {
                setShowDeactivateMessage(error.response?.data?.message || "Account Deactivated");
            } else {
                toast.error(error.response?.data?.message || "Server error occurred. Please try again later.");
            }
        }
    };


    return (
        <>
            {showDeactivateMessage && <DeactivatePopup onClose={() => setShowDeactivateMessage("")} showDeactivateMessage={showDeactivateMessage} />}
            <ToastContainer />
            {isPageLoading && <Loader />}
            <div className="flow-feilds">
                {!showOtpBox && (
                    <div className="feilds">
                        <label>Mobile Number</label>
                        <input type="text" className="filds-form" placeholder="Enter mobile"
                            value={mobile}
                            autoComplete="off"
                            maxLength={10}
                            onChange={handleMobileChange}
                        />
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
                <div className="feilds feildsBtn">
                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                    <button className={`custBtn ${mobile.length == 10 ? 'btnSuccess' : 'disabled'}`} disabled={mobile.length !== 10} onClick={!showOtpBox ? handleSendOtp : verifyMobileOtp}> {!showOtpBox ? 'Get OTP' : 'Verify'} <i className="material-icons">arrow_right_alt</i></button>
                </div>
            </div>
        </>
    )
}

export default LoginMobileNumber