import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { encryptString, createSession, getAbhaProfile, verifyUser } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';

const ForgoatAadharNumber = () => {

    const [aadhaar, setAadhaar] = useState("");
    const [step, setStep] = useState("aadhaar");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpTextValue, setOtpTextValue] = useState("");
    const [txnId, setTxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [apiResponse, setApiResponse] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    const navigate = useNavigate();
    const back = () => {
        navigate('/abha-home');
    }

    const handleForgot = (e) => {
        const inputValue = e.target.value;
        setAadhaar(inputValue);
    };

    const handleSendOtp = async () => {
        try {
            setIsPageLoading(true);
            setError("");
            const encryptedAadhaar = await encryptString(aadhaar);
            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;

            if (!accessToken) {
                throw new Error("Access token not received from session");
            }

            setAccessToken(accessToken);
            

            const response = await axios.post(`${API_BASE_URL}/abha/forgot/aadhar/send-otp`,
                {
                    loginId: encryptedAadhaar,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accesstoken': `${accessToken}`,
                    }
                }
            );

            const dtresponse = response.data;

            if (response.status === 200) {
                setTxnId(dtresponse.data.txnId);
                setStep("otp");
                setSuccess(dtresponse?.data?.message);
                setResendTimer(60);
            }
        } catch (err) {
            console.error(err);
            setError(err.dtresponse?.data?.message || "Failed to send OTP");
        } finally {
            setIsPageLoading(false);
        }
    };

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [resendTimer]);

    const handleOtpChange = (e) => {
        const value = e.target.value;
        // Allow only digits and up to 6 characters
        if (/^\d{0,6}$/.test(value)) {
            setOtpTextValue(value);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setIsPageLoading(true);
            setError("");
            const encryptedOtp = await encryptString(otpTextValue);
            
            // Use the stored access token or get a new one if needed
            const sessionResponse = await createSession();
            const token = sessionResponse?.accessToken;
            
            

            const response = await axios.post(`${API_BASE_URL}/abha/forgot/aadhar/verify-otp`,
                {
                            txnId: txnId,
                            otp: encryptedOtp
                        },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accesstoken': `${token || accessToken}`,

                    }
                }
            );

            const dtresponse = response.data;


            if (response.status === 200) {
                setSuccess(dtresponse?.data?.message);
                setApiResponse(dtresponse.data);
                
                // Store x_token if available
                if (dtresponse.data?.token) {
                    localStorage.setItem("x_token", dtresponse.data.token);
                    
                    // Get ABHA profile data
                    const abhaProfileData = await getAbhaProfile(token, dtresponse.data.token);
                    
                    if (abhaProfileData?.name) {
                        localStorage.setItem("orignalBeneficiaryData", JSON.stringify(abhaProfileData));
                        localStorage.setItem("abhaProfileData", JSON.stringify(dtresponse.data));
                    }
                }
                
                // Direct redirect to ABHA card after OTP verification
                navigate('/abha-Card');
            }
        } catch (err) {
            console.error(err);
            setError(err.dtresponse?.data?.message || "Failed to verify OTP");
        } finally {
            setIsPageLoading(false);
        }
    };

    return (
        <>
            {isPageLoading && <Loader />}
            <div className="flow-feilds aadharCardLogin">
                {step === "aadhaar" && (
                    <div className="feilds">
                        <label>Aadhar Number</label>
                        <input type="text" maxLength="14" className="filds-form" placeholder="XXXX - XXXX - XXXX" onChange={handleForgot} value={aadhaar} name="aadhaar-verify" />
                    </div>
                )}
                
                {step === "otp" && (
                    <div className="feilds">
                        <span className="notes">{success}</span>
                        <label>Enter OTP</label>
                        <input type="text" className="filds-form" placeholder="Enter OTP" maxLength={6} value={otpTextValue} onChange={handleOtpChange} />
                        <span
                            className="notes text-end"
                            onClick={() => {
                                if (resendTimer === 0) handleSendOtp(); // 🔁 Only call if timer expired
                            }}
                            style={{
                                pointerEvents: resendTimer > 0 ? "none" : "auto",
                                color: resendTimer > 0 ? "#999" : "#007bff",
                                cursor: resendTimer > 0 ? "not-allowed" : "pointer"
                            }}
                        >
                            {resendTimer > 0 ? `00:${resendTimer < 10 ? "0" + resendTimer : resendTimer} Resend OTP` : "Resend OTP?"}
                        </span>
                    </div>
                )}
            </div>
            
            <label className="terms-condition-section" htmlFor="termsConditionClick">
                <input 
                    type="checkbox" 
                    id="termsConditionClick" 
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <div className="terms-condition-right">
                    <h4>I agree to Terms and Conditions</h4>
                    <p>I, hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, with National Health Authority (NHA) </p>
                    <span className="readMore">Read More</span>
                </div>
            </label>
            
            <div className="flow-feilds pb-3" style={{ minHeight: 'auto' }}>
                <div className="feilds feildsBtn">
                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                    <button 
                        className="custBtn btnSuccess" 
                        onClick={
                            step === "aadhaar" ? handleSendOtp : 
                            step === "otp" ? handleVerifyOtp : null
                        }
                        disabled={!termsAccepted}
                    >
                        {step === "aadhaar" ? "Send OTP" : 
                         step === "otp" ? "Verify OTP" : 
                         "Submit"} <i className="material-icons">arrow_right_alt</i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ForgoatAadharNumber
