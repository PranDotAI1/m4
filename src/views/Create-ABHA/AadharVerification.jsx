import React, { useContext, useEffect, useState, useRef } from "react";
import Header from "../../components/common/Header";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import MixLogo from "../../assets/images/logo-mix.svg";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { encryptString, createSession, getAbhaProfile } from "../../services/apiUtils";
import { API_BASE_URL } from "../../config";

const AadharVerificationPage = () => {
    const { getDataByKey } = useContext(GlobalContext)
    const [adharFormated, setAdharFormated] = useState("");
    const [adharno, setAdharno] = useState("");
    const [accessToken, setaccessToken] = useState("");
    const [adharEncrpt, setadharEncrpt] = useState("");
    const [txnId, setTxnId] = useState("");
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [formatedMobile, setFormatedMobile] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [encryptAbhaOtp, setencryptAbhaOtp] = useState(null);
    const consentCheckboxRef = useRef(0);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusClass, setStatusClass] = useState("");

    const navigate = useNavigate();

    const back = () => {
        setAdharFormated("");
        setAdharno("");
        setaccessToken("");
        setadharEncrpt("");
        setTxnId("");
        navigate('/abha-home');
    }

    /**
     * Funtion used to be formate adhar number
     * @param {*} e 
     */
    const adharNumberFormater = (e) => {

        const inputValue = e.target.value;

        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, "");

        // Format the value as xx-xxxx-xxxx-xxxx
        const formattedValue = numericValue.replace(
            /^(\d{0,4})(\d{0,4})(\d{0,4}).*/,
            (match, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join("-")
        );

        // Update state
        setAdharFormated(formattedValue);
        setAdharno(numericValue);
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
    /**
     * Function used to set mobile or formate in input box
     */
    const handleMobileInput = (e) => {
        const inputValue = e.target.value;

        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, "");

        // Format the value as xx-xxxx-xxxx-xxxx
        const formattedValue = numericValue.replace(
            /^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
            (match, p1, p2, p3, p4) => [p1, p2, p3, p4].filter(Boolean).join("-")
        );

        // Update state
        setFormatedMobile(formattedValue);
        setMobileNumber(numericValue);
    };

    /**
     * Funtion is used to be hadle all the process of the send otp, adhar encription and create token as well
     * @returns
     */
    const sendAdharOtp = async () => {
        if (!adharno) {
            toast.error("Please enter Aadhaar number");
        } else {
            setIsPageLoading(true);
            const encryptedAdhar = await encryptString(adharno);
            if (!encryptedAdhar) {
                toast.error("Encryption failed. Please try again.");
            } else {
                try {
                    const sessionResponse = await createSession();
                    if (sessionResponse?.accessToken) {
                        const url = `${API_BASE_URL}/abha/enrollment/aadhar/send-otp`;
                        const param = {
                            loginId: encryptedAdhar,
                        };
                        const accessToken = sessionResponse.accessToken;
                        
                        setaccessToken(accessToken);
                        const header = {
                            headers: {
                                'Content-Type': 'application/json',
                                'accesstoken': `${accessToken}`,
                            },
                        };

                        const response = await axios.post(url, param, header);
                        const dtResponse = response.data;

                        if (dtResponse.success) {
                            setTxnId(dtResponse.data.txnId);
                            setShowOtpBox(true);
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
                    if (error.response) {
                        // Backend returned an error response
                        toast.error(error.response.data?.message || "Server error occurred. Please try again later.");
                    } else if (error.request) {
                        // Request made but no response received
                        toast.error("No response from server. Please check your connection.");
                    } else {
                        // Something else happened
                        toast.error("Something went wrong: " + error.message);
                    }
                }
            }
        }
    };

    const verifyAdharOtp = async () => {
        try {
            if (!OtpText) {
                toast.error("Please enter OTP.");
            } else if (!mobileNumber) {
                toast.error("Please enter mobile number");
            } else {
                setIsPageLoading(true);
                const encryptedOtp = await encryptString(OtpText);
                if (encryptedOtp) {
                    const url = `${API_BASE_URL}/abha/enrollment/aadhar/verify-otp`;
                    const param = {
                        txnId: txnId,
                        otpValue: encryptedOtp,
                        mobile: mobileNumber,
                    };
                    const header = {
                        headers: {
                            'Content-Type': 'application/json',
                            'accesstoken': `${accessToken}`,
                        },
                    };
                    const response = await axios.post(url, param, header);
                    const dtResponse = response.data;
                    if (dtResponse.success) {
                        localStorage.setItem("x_token", dtResponse.data.tokens.token);
                        if(dtResponse?.data?.tokens?.token){
                            const abhaProfileData = await getAbhaProfile(accessToken, dtResponse.data.tokens.token);
                            if (abhaProfileData?.success) {
                                localStorage.setItem("orignalBeneficiaryData", JSON.stringify(abhaProfileData?.data));
                                localStorage.setItem("abhaProfileData", JSON.stringify(dtResponse.data?.ABHAProfile));
                                setIsPageLoading(false);
                                navigate("/abha-Card");
                            }else{
                                toast.error(abhaProfileData?.message || "Failed to fetch ABHA profile data. Please try again.");
                                setIsPageLoading(false);
                                return;
                            }
                        }else{
                            toast.error("Failed to retrieve token. Please try again.");
                            setIsPageLoading(false);
                            return;
                        }
                        
                    }else{
                        toast.error(dtResponse?.message || "Failed to verify OTP. Please try again.");
                        setIsPageLoading(false);
                    }
                } else {
                    setIsPageLoading(false);
                    toast.error("Encryption failed. Please try again.");
                }
            }
        } catch (error) {
            setIsPageLoading(false);
            if (error.response) {
                // Backend returned an error response
                toast.error(error.response.data?.message || "Server error occurred. Please try again later.");
            } else if (error.request) {
                // Request made but no response received
                toast.error("No response from server. Please check your connection.");
            } else {
                // Something else happened
                toast.error("Something went wrong: " + error.message);
            }
        }
    };

    return (
        <>
            <div className="mainFlow">
                <Header />
                <ToastContainer />
                {isPageLoading && <Loader />}
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} />
                        </div>
                        <div className="userFlowAdharVer pre-create-ABHA">
                            <div className="backArrow" onClick={back}>
                                <i class="material-icons">
                                    keyboard_backspace
                                </i>
                            </div>
                            <div className="flowTitle">
                                <h4>Aadhar Verification</h4>
                                <p>OTP will be sent to the mobile number to the aadhar</p>
                            </div>
                            <div className="flow-feilds">
                                {!showOtpBox &&
                                    <div className="feilds">
                                        <label>Aadhar Number</label>
                                        <input type="text" className="filds-form" placeholder="Enter Aadhar" name="adharno" maxLength="14" value={adharFormated} onChange={adharNumberFormater} autoComplete='off' />
                                    </div>
                                }
                                {showOtpBox && (
                                    <>
                                        <div className="feilds">
                                            <label>Enter OTP</label>
                                            <input type="text" className="filds-form" placeholder="Enter OTP" maxLength={6} value={OtpText} onChange={handleOtpChange} />
                                        </div>
                                        <div className="feilds">
                                            <label>Enter Mobile Number</label>
                                            <input type="text" className="filds-form" placeholder="Enter Mobile Number" maxLength={12} value={formatedMobile} onChange={handleMobileInput} />
                                        </div>
                                    </>
                                )}
                                <div className="feilds feildsBtn mt-5">
                                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                                    {!showOtpBox && (
                                        <button className="custBtn btnSuccess" onClick={sendAdharOtp}>Continue <i className="material-icons">arrow_right_alt</i></button>
                                    )}
                                    {showOtpBox && (
                                        <button className="custBtn btnSuccess" onClick={verifyAdharOtp}>Verify<i className="material-icons">arrow_right_alt</i></button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AadharVerificationPage;