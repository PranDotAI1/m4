import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import MixLogo from "../../assets/images/logo-mix.svg";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { encryptString, createSession } from "../../services/apiUtils";
import { API_BASE_URL } from "../../config";
import { v4 as uuidv4 } from 'uuid';

const DLverificationPage = () => {
    const { getDataByKey } = useContext(GlobalContext);
    const checked = getDataByKey('DrivingLicenseNumber');

    const [dlFormated, setDlFormated] = useState("");
    const [dlNumber, setDlNumber] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [dlEncrpt, setDlEncrpt] = useState("");
    const [txnId, setTxnId] = useState("");
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [formatedMobile, setFormatedMobile] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [encryptDlOtp, setEncryptDlOtp] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusClass, setStatusClass] = useState("");

    const navigate = useNavigate();

    const back = () => {
        setDlFormated("");
        setDlNumber("");
        setAccessToken("");
        setDlEncrpt("");
        setTxnId("");
        navigate('/abha-home');
    };

    // DL number formatter
    const dlNumberFormater = (e) => {
        const inputValue = e.target.value;
        // Remove non-alphanumeric characters
        const cleanValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");

        // Format the value as DL-XXXXXXXX
        const formattedValue = cleanValue.replace(
            /^([A-Z]{2})(\d{13})$/,
            (match, p1, p2) => `${p1}-${p2}`
        );

        setDlFormated(formattedValue.toUpperCase());
        setDlNumber(cleanValue.toUpperCase());
    };

    // Handle OTP input
    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setOtpText(value);
        }
    };

    // Handle mobile number input
    const handleMobileInput = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, "");
        const formattedValue = numericValue.replace(
            /^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
            (match, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join("-")
        );

        setFormatedMobile(formattedValue);
        setMobileNumber(numericValue);
    };

    // Send OTP request
    const sendDlOtpRequest = async (encryptedDl) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/abha/api/v3/enrollment/request/otp`,
                {
                    txnId: "",
                    scope: ["abha-enrol"],
                    loginHint: "driving-license",
                    loginId: encryptedDl,
                    otpSystem: "abdm",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'REQUEST-ID': uuidv4(),
                        'TIMESTAMP': new Date().toISOString(),
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error in OTP request:", error);
            throw error;
        }
    };

    // Effect for sending OTP when access token is available
    useEffect(() => {
        if (!accessToken || !dlEncrpt) return;

        const sendOtpIfReady = async () => {
            try {
                const dlOtpResponse = await sendDlOtpRequest(dlEncrpt);
                if (dlOtpResponse?.txnId) {
                    toast.success(dlOtpResponse?.message);
                    setTxnId(dlOtpResponse.txnId);
                    setIsPageLoading(false);
                    setShowOtpBox(true);
                } else {
                    setAccessToken("");
                    setIsPageLoading(false);
                    toast.error(dlOtpResponse?.message || "Failed to send OTP. Please try again.");
                }
            } catch (error) {
                setIsPageLoading(false);
                console.error("OTP Send Error:", error);

                // Inspect the response data from the backend
                if (error.response) {
                    console.error("Status Code:", error.response.status);
                    console.error("Response Headers:", error.response.headers);
                    console.error("Response Data:", error.response.data); // 👈 THIS is key
                    toast.error(`Error: ${error.response.data?.message || 'Bad request'}`);
                } else {
                    toast.error("Network or client error");
                }
            }
        };

        sendOtpIfReady();
    }, [accessToken, dlEncrpt]);

    // Send OTP for DL verification
    const sendCreateDlOtp = async () => {
        setIsPageLoading(true);
        if (dlNumber) {
            try {
                const encryptedDl = await encryptString(dlNumber);
                if (!encryptedDl) {
                    setStatusMessage("Failed to encrypt DL. Please try again.");
                    setStatusClass("error");
                    setIsPageLoading(false);
                    toast.error("Failed to encrypt DL. Please try again.");
                    return;
                }

                setDlEncrpt(encryptedDl);
                const sessionResponse = await createSession();

                if (!sessionResponse?.accessToken) {
                    setStatusMessage(sessionResponse?.error?.message || "Failed to create session.");
                    setStatusClass("error");
                    setIsPageLoading(false);
                    toast.error(sessionResponse?.error?.message || "Failed to create session.");
                    return;
                }

                setAccessToken(sessionResponse.accessToken);
                localStorage.setItem("abdmAccessToken", sessionResponse.accessToken);
                setStatusMessage("OTP sent successfully.");
                setStatusClass("success");
            } catch (error) {
                setStatusMessage("An unexpected error occurred. Please try again.");
                setStatusClass("error");
                setIsPageLoading(false);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } else {
            setStatusMessage("Please enter Driving License number");
            setStatusClass("error");
            setIsPageLoading(false);
            toast.error("Please enter Driving License number");
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/abha/api/v3/enrollment/enrol/byDrivingLicense`,
                {
                    authData: {
                        authMethods: ["otp"],
                        otp: {
                            txnId: txnId,
                            otpValue: encryptDlOtp,
                            mobile: mobileNumber,
                        },
                    },
                    consent: {
                        code: "abha-enrollment",
                        version: "1.4",
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'REQUEST-ID': uuidv4(),
                        'TIMESTAMP': new Date().toISOString(),
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            toast.error("Something went wrong!!");
            setIsPageLoading(false);
        }
    };

    // Effect for OTP verification
    useEffect(() => {
        const verifyOtpIfReady = async () => {
            if (mobileNumber && encryptDlOtp) {
                const dlOtpResponse = await verifyOtp();
                if (dlOtpResponse?.txnId) {
                    if (dlOtpResponse?.ABHAProfile) {
                        const orignalProfileData = dlOtpResponse.ABHAProfile;
                        const orignalBeneficiaryData = {
                            dob: orignalProfileData.dob,
                            gender: orignalProfileData.gender,
                            phrAddress: orignalProfileData.phrAddress[0],
                            ABHANumber: orignalProfileData.ABHANumber,
                            mobile: orignalProfileData.mobile,
                            name: orignalProfileData.firstName + ' ' + orignalProfileData.middleName + ' ' + orignalProfileData.lastName,
                            photo: orignalProfileData.photo
                        };
                        localStorage.setItem("orignalBeneficiaryData", JSON.stringify(orignalBeneficiaryData));
                        setIsPageLoading(false);
                        navigate("/abha-Card");
                    }
                } else if (dlOtpResponse?.message) {
                    setIsPageLoading(false);
                    toast.error(dlOtpResponse?.message);
                } else {
                    setIsPageLoading(false);
                    toast.error(dlOtpResponse?.mobile);
                }
            }
        };
        verifyOtpIfReady();
    }, [mobileNumber, encryptDlOtp]);

    // Handle Create ABHA
    const handleCreateAbha = async () => {
        try {
            if (!OtpText) {
                setIsPageLoading(false);
                toast.error("Please enter OTP.");
            } else if (!mobileNumber) {
                setIsPageLoading(false);
                toast.error("Please enter mobile number");
            } else {
                setIsPageLoading(true);
                const encryptedOtp = await encryptString(OtpText);
                if (!encryptedOtp) {
                    setIsPageLoading(false);
                    toast.error("Encryption failed. Please try again.");
                    return;
                }
                setEncryptDlOtp(encryptedOtp);
            }
        } catch (error) {
            setIsPageLoading(false);
            toast.error("An unexpected error occurred.");
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
                            <img src={MixLogo} alt="Logo" />
                        </div>
                        <div className="userFlowAdharVer pre-create-ABHA">
                            <div className="backArrow" onClick={back}>
                                <i className="material-icons">
                                    keyboard_backspace
                                </i>
                            </div>
                            <div className="flowTitle">
                                <h4>Driving License Verification</h4>
                                <p>OTP will be sent to the mobile number linked to the Driving License</p>
                            </div>
                            <div className="flow-feilds">
                                {!showOtpBox &&
                                    <div className="feilds">
                                        <label>Driving License Number</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="Format: DL-000000000000"
                                            value={dlFormated}
                                            onChange={dlNumberFormater}
                                            autoComplete='off'
                                        />
                                        <span className={`notes ${statusClass}`}>
                                            {statusMessage || "DL verification allows to start using your ABHA account instantly"}
                                        </span>
                                    </div>
                                }
                                {showOtpBox && (
                                    <>
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
                                        </div>
                                        <div className="feilds">
                                            <label>Enter Mobile Number</label>
                                            <input
                                                type="text"
                                                className="filds-form"
                                                placeholder="Enter Mobile Number"
                                                maxLength={12}
                                                value={formatedMobile}
                                                onChange={handleMobileInput}
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="feilds feildsBtn mt-5">
                                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                                    {!showOtpBox && (
                                        <button
                                            className="custBtn btnSuccess"
                                            onClick={sendCreateDlOtp}
                                        >
                                            Continue <i className="material-icons">arrow_right_alt</i>
                                        </button>
                                    )}
                                    {showOtpBox && (
                                        <button
                                            className="custBtn btnSuccess"
                                            onClick={handleCreateAbha}
                                        >
                                            Verify<i className="material-icons">arrow_right_alt</i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DLverificationPage;
