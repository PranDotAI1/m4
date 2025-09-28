import React, { useState, useEffect } from "react";
import MixLogo from '../../assets/images/logo-mix.svg';
import ReactivateModel from "../../components/Reactivate-ABHA/Reactivate-model";
import { encryptString, createSession } from "../../services/apiUtils";
import axios from 'axios';
import Loader from '../../components/common/Loader';
import { API_BASE_URL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReactivateABHA = () => {
    const [showModal, setShowModal] = useState(false);
    const [formateAbha, setFormateAbha] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [txnId, setTxnId] = useState("");
    const [resendTimer, setResendTimer] = useState(0);
    const [isReactivated, setIsReactivated] = useState(false);

    const navigate = useNavigate();
    const back = () => {
        navigate('/abha-home');
    }

    /**
     * function used to format ABHA no. in input box
     */
    const handleAbhaChange = (e) => {
        const inputValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, "");

        // Format the value as xx-xxxx-xxxx-xxxx
        const formattedValue = numericValue.replace(
            /^(\d{2})(\d{0,4})(\d{0,4})(\d{0,4}).*/,
            (match, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join("-")
        );

        // Update state
        setFormateAbha(formattedValue);
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

    // Send OTP Request
    const handleSendOtp = async () => {
        if (formateAbha.length !== 17) {
            toast.error("Please enter a valid ABHA number");
            return;
        }
        setIsPageLoading(true);
        try {
            // Encrypt ABHA number
            const encryptedAbha = await encryptString(formateAbha);
            // Create session
            const sessionResponse = await createSession();


            if (sessionResponse?.accessToken && encryptedAbha) {
                setAccessToken(sessionResponse.accessToken);

                // Prepare request body
                const requestBody = {
                    loginId: encryptedAbha,
                };

                const response = await axios.post(
                    `${API_BASE_URL}/abha/account/re-activate/send-otp`,
                    requestBody,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'accesstoken': sessionResponse.accessToken
                        }
                    }
                );
                const dtresponse = response.data;
                if (dtresponse?.success) {
                    setIsPageLoading(false);
                    setTxnId(dtresponse.data.txnId);
                    setShowOtpBox(true);
                    setResendTimer(60);
                    toast.success(dtresponse.data.message || "OTP sent successfully");
                } else {
                    toast.error(dtresponse.data.message || "Failed to send OTP");
                }
            } else {
                toast.error("Failed to create session or encrypt ABHA number");
            }
        } catch (error) {
            setIsPageLoading(false);
            // Backend returned an error response
            if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                toast.error(error.response.data.message);
            } else if (error.response.data.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else if (error.response.data?.error?.error?.message) {
                toast.error(error.response.data.error.error.message);
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        } finally {
            setIsPageLoading(false);
        }
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        if (OtpText.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setIsPageLoading(true);

        try {
            const encryptedOtp = await encryptString(OtpText);

            if (accessToken && encryptedOtp) {
                const requestBody = {
                    txnId: txnId,
                    otp: encryptedOtp
                };

                const response = await axios.post(
                    `${API_BASE_URL}/abha/account/re-activate/verify-otp`,
                    requestBody,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'accesstoken': accessToken
                        }
                    }
                );
                const dtresponse = response.data;
                if (dtresponse.success) {
                    if (dtresponse.data.authResult === 'success') {
                        setIsReactivated(true);
                        // toast.success("ABHA account reactivated successfully");
                        setShowModal(true);
                        // Reset form
                        setShowOtpBox(false);
                        setOtpText("");
                        setFormateAbha("");
                        // setTimeout(() => {
                        //     navigate("/login-ABHA");
                        // }, 2000);

                    } else {
                        toast.error(dtresponse?.data?.message || "Wrong OTP. Please try again.");
                        setIsPageLoading(false);
                    }
                } else {
                    setIsPageLoading(false);
                    toast.error("Failed to verify OTP");
                }
            } else {
                setIsPageLoading(false);
                toast.error("failed to create sesssion  or encrypt otp");
            }
        } catch (error) {
            setIsPageLoading(false);
            // Backend returned an error response
            if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                toast.error(error.response.data.message);
            } else if (error.response.data.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        } finally {
            setIsPageLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (resendTimer > 0) return;
        handleSendOtp();
    };

    // Timer effect
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    return (
        <>
            <ToastContainer />
            {isPageLoading && <Loader />}
            <div className="mainFlow reactivatePageDesign">
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} alt="Logo" />
                        </div>
                        <div className="userFlowAdharVer anotherPaddingPage">
                            <div className="flowTitle">
                                <h4>Reactivate ABHA</h4>
                            </div>

                            {errorMessage && (
                                <div className="error-message">{errorMessage}</div>
                            )}
                            {successMessage && (
                                <div className="success-message">{successMessage}</div>
                            )}

                            <div className="flow-feilds">
                                {!showOtpBox ? (
                                    <div className="feilds">
                                        <label>ABHA Number</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="Enter ABHA Number"
                                            value={formateAbha}
                                            onChange={handleAbhaChange}
                                        />
                                    </div>
                                ) : (
                                    <div className="feilds">
                                        <label>Enter OTP</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="Enter OTP"
                                            maxLength={6}
                                            value={OtpText}
                                            onChange={handleOtpChange}
                                        />
                                        <span
                                            className="notes text-end"
                                            style={{
                                                pointerEvents: resendTimer > 0 ? "none" : "auto",
                                                color: resendTimer > 0 ? "#999" : "#007bff",
                                                cursor: resendTimer > 0 ? "not-allowed" : "pointer"
                                            }}
                                            onClick={handleResendOtp}
                                        >
                                            {resendTimer > 0 ? `00:${resendTimer < 10 ? '0' + resendTimer : resendTimer} Resend OTP` : 'Resend OTP ?'}
                                        </span>
                                    </div>
                                )}

                                <div className="feilds feildsBtn mt-5">
                                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                                    <button
                                        className={`custBtn ${(!showOtpBox && formateAbha.length === 17) || (showOtpBox && OtpText.length === 6) ? 'btnSuccess' : 'disabled'}`}
                                        onClick={!showOtpBox ? handleSendOtp : handleVerifyOtp}
                                        disabled={(!showOtpBox && formateAbha.length !== 17) || (showOtpBox && OtpText.length !== 6)}
                                    >
                                        {!showOtpBox ? 'Get OTP' : 'Verify OTP'} <i className="material-icons">arrow_right_alt</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <ReactivateModel onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default ReactivateABHA;
