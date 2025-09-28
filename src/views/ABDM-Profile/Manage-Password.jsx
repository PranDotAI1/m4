import React, { useEffect, useState } from "react";
import { encryptString, createSession, userLogout } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from "../../config";
import Header from "../../components/common/Header";
import MixLogo from '../../assets/images/logo-mix.svg'
import User from '../../assets/images/comman/user-1.png'
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../../components/Abha-home/ABHA-SidebarMenu";
import { ToastContainer, toast } from "react-toastify";


const ManagePassword = () => {

    const [showOtpBox, setShowOtpBox] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [strength, setStrength] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [accessToken, setaccessToken] = useState("");
    const [passEncrypt, setPassEncrypt] = useState("");
    const [txnId, settxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout(navigate);
    };

    useEffect(() => {

        const storedProfile = JSON.parse(localStorage.getItem("orignalBeneficiaryData"));
        if (storedProfile) {
            const base64Prefix = "data:image/png;base64,";
            const base64String = storedProfile ? base64Prefix + storedProfile.profilePhoto : null;
            console.log("base64String", storedProfile.profilePhoto);
            if (base64String) {
                setProfilePhoto(base64String);
            }
        }
    }, [localStorage.getItem("orignalBeneficiaryData")]);

    useEffect(() => {
        console.log('Updated profilePhoto:', profilePhoto);
    }, [profilePhoto]);

    const handleCancle = (value) => {
        setPassword("");
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        validateStrength(value);
    };

    const validateStrength = (value) => {
        if (value.length < 4) {
            setStrength('Too short');
        } else if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
            setStrength('Weak (needs uppercase and number)');
        } else if (value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) {
            setStrength('Strong');
        } else {
            setStrength('Medium');
        }
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

    const sendOtpRequest = async (encryptedPass) => {

        try {
            const xToken = localStorage.getItem("x_token");
            const response = await axios.post(
                `${API_BASE_URL}/abha/account/change-password/send-otp`,
                {
                    "loginId": encryptedPass,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xtoken': `${xToken}`,
                        'accesstoken': `${accessToken}`,
                    }
                }
            );
            const dtresponse = response.data;
            return dtresponse.data;
        } catch (error) {
            setIsPageLoading(false);
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
        }

    };

    // Trigger when accessToken changes
    useEffect(() => {
        const sendOtpIfReady = async () => {
            if (accessToken && passEncrypt) {
                try {
                    const response = await sendOtpRequest(passEncrypt);
                    if (response?.txnId) {
                        toast.success(response.message);
                        settxnId(response.txnId);
                        setShowOtpBox(true);
                        setIsPageLoading(false);
                        setResendTimer(60); // Example: 60 seconds
                    }
                } catch (error) {
                    setIsPageLoading(false);
                }
            }
        };
        sendOtpIfReady();
    }, [accessToken, passEncrypt]);

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
        setError('');
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            setIsPageLoading(true);
            try {
                // Encrypt Aadhaar
                const encryptedPass = await encryptString(password);
                if (!encryptedPass) {
                    setIsPageLoading(false);
                    toast.error("Failed to encrypt password. Please try again.");
                    return;
                }
                setPassEncrypt(encryptedPass); // Update state

                // Create session
                const sessionResponse = await createSession();
                if (!sessionResponse?.accessToken) {
                    setIsPageLoading(false);
                    toast.error(sessionResponse?.error?.message || "Failed to create session.");
                    return;
                }
                setaccessToken(sessionResponse.accessToken); // Update state
            } catch (error) {
                setIsPageLoading(false);
                toast.error("An unexpected error occurred. Please try again.");
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
            const xToken = localStorage.getItem("x_token");
            const encryptedOtp = await encryptString(OtpText);
            if (encryptedOtp) {
                const response = await axios.post(
                    `${API_BASE_URL}/abha/account/change-password/verify-otp`,
                    {
                        "txnId": txnId,
                        "otp": encryptedOtp,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'xtoken': `${xToken}`,
                            'REQUEST-ID': uuidv4(),
                            'TIMESTAMP': new Date().toISOString(), // Generate the current timestamp dynamically
                            'accesstoken': `${accessToken}`,
                        }
                    }
                );
                const dtresponse = response.data;
                if (dtresponse.success) {

                    if (dtresponse?.data?.authResult === 'success') {
                        toast.success(dtresponse.data.message);
                        setPasswordChangeSuccess(true);
                        setIsPageLoading(false);

                        // Add a delay before navigation
                        setTimeout(() => {
                            navigate('/abha-Card');
                        }, 3000); // 3 seconds delay
                    } else {
                        toast.error(dtresponse.data.message || "Wrong OTP. Please try again.");
                        settxnId(dtresponse.data.txnId);
                        setIsPageLoading(false);
                    }

                } else {
                    toast.error(dtresponse.data.message || "Failed to change password. Please try again.");
                    setIsPageLoading(false);
                }
            }
        } catch (error) {
            setIsPageLoading(false);
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
        }
    };

    return (
        <>
            {isPageLoading && <Loader />}
            <ToastContainer />
            <div className="mainFlow">
                <Header />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} />
                        </div>
                        <div className="userFlowAdharVer">
                            <div className="user-profile-dashboard">
                                <SidebarMenu activePage="password" />
                                <div className="centerBoard">
                                    <div className="rightProfileMain withoutBorder myProfilePage">
                                        <div className="phrAddress">
                                            <div className="feilds mb-2">
                                                <label>New Password</label>
                                                <input type="password" placeholder="********"
                                                    value={password}
                                                    onChange={(e) => handlePasswordChange(e.target.value)} />
                                                <span className={`notes`}>{strength}</span>
                                            </div>
                                            <div className="feilds">
                                                <label>Reenter new password</label>
                                                <input type="password" placeholder="********" value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                        </div>

                                        <div className="validate">
                                            <p>Validate Using</p>
                                            <label className="validateSelect" for="aadharNumberOTO">
                                                <input type="radio" name="validate" id="aadharNumberOTO" checked={true} />
                                                <div className="valideContent" >
                                                    <h4>Aadhaar number OTP</h4>
                                                    <p>OTP on mobile number linked with Aadhaar number</p>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="phrAddress">
                                            <div className="feilds mb-2">
                                                {showOtpBox && !passwordChangeSuccess && (
                                                    <>
                                                        <label>Confirm OTP</label>
                                                        <input type="text" className="filds-form" placeholder="Enter OTP" maxLength={6} value={OtpText} onChange={handleOtpChange} />
                                                        <span className="notes text-end"
                                                            style={{
                                                                pointerEvents: resendTimer > 0 ? "none" : "auto",
                                                                color: resendTimer > 0 ? "#999" : "#007bff",
                                                                cursor: resendTimer > 0 ? "not-allowed" : "pointer"
                                                            }}
                                                        >{resendTimer > 0 ? '00:' + resendTimer + ' Resend OTP' : 'Resend OTP ?'} </span>
                                                    </>
                                                )}
                                                {passwordChangeSuccess && (
                                                    <div className="success-message" style={{
                                                        color: 'green',
                                                        padding: '15px',
                                                        textAlign: 'center',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#e8f5e9',
                                                        borderRadius: '5px',
                                                        marginBottom: '15px'
                                                    }}>
                                                        <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                                                        Password changed successfully! Redirecting to your ABHA Card...
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="rightDashBord">
                                    <div className="profileImg">
                                        <img src={profilePhoto} />
                                    </div>
                                </div>
                            </div>

                            <div className="bottomDashboard">
                                <div className="saveBtnProfile justify-content-center">
                                    <button className="custBtn btnThems" onClick={handleCancle}>Cancel</button>
                                    <button
                                        className={`custBtn ${strength == "Strong" ? 'btnSuccess' : 'disabled'}`}
                                        disabled={strength !== "Strong" || passwordChangeSuccess}
                                        onClick={!showOtpBox ? handleSendOtp : verifyOtp}
                                    >
                                        {!showOtpBox ? 'Get OTP' : (passwordChangeSuccess ? 'Saved' : 'Save')}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagePassword;
