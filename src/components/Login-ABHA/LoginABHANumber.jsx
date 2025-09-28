import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import { encryptString, createSession, getAbhaProfile } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { toast, ToastContainer } from 'react-toastify';
import DeactivatePopup from "../../components/Forgot-ABHA/Account-deactivate-popup";

const LoginABHANumber = () => {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [formateAbha, setFormateAbha] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accessToken, setaccessToken] = useState("");
    const [txnId, settxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [showDeactivateMessage, setShowDeactivateMessage] = useState("");
    const navigate = useNavigate();

    const { getDataByKey } = useContext(GlobalContext);
    const back = getDataByKey('backfunction');

    /**
     * function used to formate ABHA no. in input box
     */
    const handleFormateAbha = (e) => {
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
        // setabhano(numericValue);
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
    const handleSendOtp = async (event) => {
        event.preventDefault();
        setIsPageLoading(true);
        try {
            // Encrypt Aadhaar
            const encryptedAbhano = await encryptString(formateAbha);
            if (encryptedAbhano) {
                const sessionResponse = await createSession();
                if (sessionResponse?.accessToken) {

                    const url = `${API_BASE_URL}/abha/login/abha/number/send-otp`;
                    const param = {
                        abhaNumber: encryptedAbhano,
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
            } else if (error.response.data.success === false && error.response.data.message === "This account is deactivated. Please continue to reactivate.") {
                setShowDeactivateMessage(error.response.data.message);
            } else {
                toast.error(error.response.data.message || "Server error occurred. Please try again later.");
            }
        }
    };
    /**
     * Functin used to verify abha number
     */
    const verifyOtp = async (event) => {
        event.preventDefault();
        setIsPageLoading(true);
        try {
            const encryptedOtp = await encryptString(OtpText);
            if (encryptedOtp) {
                const url = `${API_BASE_URL}/abha/login/abha/number/verify-otp`;
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
            <div className="flow-feilds">
                {errorMessage && (
                    <p className="notes">{errorMessage}</p>
                )}
                {/* {!showOtpBox && (
                    <div className="feilds">
                        <label>Enter ABHA Number</label>
                        <input type="text" className="filds-form" placeholder="xx - xxxx - xxxx - xxxx" maxLength="18" // Max length for the formatted value
                            value={formateAbha}
                            autoComplete="off"
                            onChange={handleFormateAbha} />
                    </div>
                )} */}

                <div className="gridFeilds">
                    <div className="feildsColum">
                        <div className="feilds">
                            <label>Full Name *</label>
                            <input type="text" className="filds-form" placeholder="Full Name" maxLength="18"
                                autoComplete="off" />
                        </div>
                    </div>
                    <div className="feildsColum">
                        <div className="feilds">
                            <label>Date of Birth *</label>
                            <input type="date" className="filds-form" placeholder="DOB"
                                autoComplete="off" />
                        </div>
                    </div>
                </div>
                <div className="gridFeilds">
                    <div className="feildsColum">
                        <div className="feilds">
                            <label>Gender *</label>
                            <select>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="feildsColum">
                        <label style={{ color: '#111928', fontWeight: '500', fontSize: '14px', lineHeight: '21px', marginBottom: '5px' }}>Driving License Number *</label>
                        <div className="gridFeilds">
                            <div className="feildsColum" style={{ width: '40%' }}>
                                <div className="feilds">
                                    <input type="text" className="filds-form" placeholder="Ex. KA31"
                                        autoComplete="off" />
                                </div>
                            </div>
                            <div className="feildsColum">
                                <div className="feilds">
                                    <input type="text" className="filds-form" placeholder="478141878478"
                                        autoComplete="off" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gridFeilds">
                    <div className="feildsColum">
                        <div className="feilds">
                            <label>Upload Your Driving *</label>
                            <div className="fileUploadSection">
                                <input type="file" className="filds-form" />
                                <h6>Drag files here to upload</h6>
                                <p>or browse for files</p>
                            </div>
                        </div>
                    </div>
                    <div className="feildsColum">
                        <div className="feilds">
                            <label>Preview</label>
                            <textarea className="filds-form" rows={'5'} ></textarea>
                        </div>
                    </div>
                </div>

                <label className="terms-condition-section" for="termsConditionClick">
                    <input type="checkbox" id="termsConditionClick" value="1" />
                    <div className="terms-condition-right">
                        <h4>I agree to Terms and Conditions</h4>
                        <p>I, hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, with National Health Authority (NHA)...  </p>
                        <span className="readMore">Read More</span>
                    </div>
                </label>

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


                <div className="feilds feildsBtn mt-4">
                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                    <button className={`custBtn ${formateAbha.length == 17 ? 'btnSuccess' : 'disabled'}`} disabled={formateAbha.length !== 17} onClick={!showOtpBox ? handleSendOtp : verifyOtp}> {!showOtpBox ? 'Submit' : 'Verify'} <i className="material-icons">arrow_right_alt</i></button>
                </div>
            </div>
        </>
    )
}

export default LoginABHANumber


