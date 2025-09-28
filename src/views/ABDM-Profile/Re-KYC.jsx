import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import MixLogo from '../../assets/images/logo-mix.svg';
import { encryptString, createSession, userLogout } from "../../services/apiUtils";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../../components/common/Loader';
import { API_BASE_URL } from "../../config";
import SidebarMenu from "../../components/Abha-home/ABHA-SidebarMenu";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ReKYC = () => {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [formateAbha, setFormateAbha] = useState("");
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [txnId, setTxnId] = useState("");
    const [resendTimer, setResendTimer] = useState(0);
    const [isKycComplete, setIsKycComplete] = useState(false);
    const [OtpText, setOtpText] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout(navigate);
    };

    const handleAbhaChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, "");
        const formattedValue = numericValue.replace(
            /^(\d{2})(\d{0,4})(\d{0,4})(\d{0,4}).*/,
            (match, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join("-")
        );
        setFormateAbha(formattedValue);
    };

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setOtpText(value);
        }
    };

    const handleSendOtp = async () => {
        setIsPageLoading(true);
        try {
            const xToken = localStorage.getItem("x_token");
            const encryptedAbha = await encryptString(formateAbha);
            const sessionResponse = await createSession();

            if (sessionResponse?.accessToken && encryptedAbha) {
                setAccessToken(sessionResponse.accessToken);
                const response = await axios.post(
                    `${API_BASE_URL}/abha/account/re-kyc/send-otp`,
                    { loginId: encryptedAbha },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'xtoken': xToken,
                            'accesstoken': sessionResponse.accessToken,
                        }
                    }
                );

                const dtResponse = response.data;
                if (dtResponse.success) {
                    setIsPageLoading(false);
                    setTxnId(dtResponse.data?.txnId);
                    setShowOtpBox(true);
                    setResendTimer(60);
                    toast.success(response.data.message || "OTP sent successfully");
                } else {
                    toast.error(dtResponse?.message || "Failed to send OTP. Please try again.");
                    setIsPageLoading(false);
                }
            } else {
                setIsPageLoading(false);
                toast.error("Failed to create session. Please try again.");
            }
        } catch (error) {
            // Backend returned an error response
            if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                toast.error(error.response.data.message);
                setTimeout(() => {
                    handleLogout();
                }, 3000);
            } else if (error.response.data.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        } finally {
            setIsPageLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsPageLoading(true);
        try {
            const xToken = localStorage.getItem("x_token");
            const encryptedOtp = await encryptString(OtpText);

            if (accessToken && encryptedOtp) {
                const response = await axios.post(
                    `${API_BASE_URL}/abha/account/re-kyc/verify-otp`,
                    { txnId, otp: encryptedOtp },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'xtoken': xToken,
                            'REQUEST-ID': uuidv4(),
                            'TIMESTAMP': new Date().toISOString(),
                            'accesstoken': accessToken,
                        }
                    }
                );
                const dtResponse = response.data;
                if (dtResponse.success) {

                    if (dtResponse.data.authResult === 'success') {
                        setIsPageLoading(false);
                        setIsKycComplete(true);
                        toast.success(dtResponse?.data?.message );
                    } else {
                        setTxnId(dtResponse.data?.txnId);
                        toast.error(dtResponse?.data?.message || "Wrong OTP. Please try again.");
                        setIsPageLoading(false);
                    }
                } else {
                    toast.error(dtResponse?.data?.message || "Failed to verify OTP. Please try again.");
                    setIsPageLoading(false);
                }
            } else {
                toast.error("Failed to create session or failed to encrypt otp");
                setIsPageLoading(false);
            }
        } catch (error) {
            // Backend returned an error response
            if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                toast.error(error.response.data.message);
                setTimeout(() => {
                    handleLogout();
                }, 3000);
            } else if (error.response.data.message === "Unclassified Authentication Failure") {
                toast.error(error.response.data.message + ". Please try again!");
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        } finally {
            setIsPageLoading(false);
        }
    };

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
            <div className="mainFlow">
                <Header />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} alt="Logo" />
                        </div>
                        <div className="userFlowAdharVer">
                            <div className="user-profile-dashboard">
                                <SidebarMenu activePage="re-kyc" />
                                <div className="centerBoard kyc-section-page">
                                    <div className="rightProfileMain withoutBorder re-kyc">
                                        <div className="kyc-section">
                                            <div className="re-kyc-heading">
                                                <h4>Complete Re-KYC Using ABHA</h4>
                                            </div>
                                            {!showOtpBox ? (
                                                !isKycComplete && (
                                                    <>
                                                        <div className="feilds">
                                                            <label>ABHA Number</label>
                                                            <input type="text" value={formateAbha} onChange={handleAbhaChange} placeholder="Enter your ABHA number" />
                                                        </div>
                                                        <label className="terms-condition-section">
                                                            <input type="checkbox" checked={isTermsAccepted} onChange={(e) => setIsTermsAccepted(e.target.checked)} />
                                                            <div className="terms-condition-right">
                                                                <h4>I agree to Terms and Conditions</h4>
                                                                <p>I hereby declare that I am voluntarily sharing my ABHA number for Re-KYC verification</p>
                                                            </div>
                                                        </label>
                                                    </>
                                                )
                                            ) : (
                                                <div className="compleate-kyc-section">
                                                    <div className="feilds">
                                                        <label>Confirm OTP </label>
                                                        <input type="text" maxLength={6} value={OtpText} onChange={handleOtpChange} placeholder="Enter OTP" />
                                                        <span className="notes text-end"
                                                            style={{
                                                                pointerEvents: resendTimer > 0 ? "none" : "auto",
                                                                color: resendTimer > 0 ? "#999" : "#007bff",
                                                                cursor: resendTimer > 0 ? "not-allowed" : "pointer"
                                                            }}>
                                                            {resendTimer > 0 ? '00:' + resendTimer + ' Resend OTP' : 'Resend OTP ?'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            {isKycComplete && (
                                                <div className="nowCompleateReKYC">
                                                    <div className="compleateKYC-icon">
                                                        <span className="bgImg">&nbsp;</span>
                                                        <h4>Re KYC Complete</h4>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomDashboard">
                                {!isKycComplete && (
                                    <div className="saveBtnProfile justify-content-center">
                                        <button className="custBtn btnThems">Cancel</button>
                                        <button
                                            className={`custBtn ${(formateAbha.length === 17 && isTermsAccepted) ? 'btnSuccess' : 'disabled'}`}
                                            disabled={formateAbha.length !== 17 || !isTermsAccepted}
                                            onClick={!showOtpBox ? handleSendOtp : handleVerifyOtp}
                                        >
                                            {!showOtpBox ? 'Get OTP' : 'Continue'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReKYC;
