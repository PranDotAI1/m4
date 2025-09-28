import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { encryptString, createSession, getAbhaProfile, verifyUser } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';
import { ToastContainer, toast } from "react-toastify";

const ForgoatMobileNumber = () => {
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState("mobile");
    const [otpTextValue, setOtpTextValue] = useState("");
    const [txnId, setTxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "Male"
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    const navigate = useNavigate();
    const back = () => {
        navigate('/abha-home');
    }

    const handleForgot = (e) => {
        const inputValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, "");
        setMobile(numericValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderChange = (gender) => {
        setUserDetails(prev => ({
            ...prev,
            gender
        }));
    };

    const handleSendOtp = async () => {
        try {
            setIsPageLoading(true);
            const encryptedMobile = await encryptString(mobile);
            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;

            if (!accessToken) {
                throw new Error("Access token not received from session");
            }

            setAccessToken(accessToken);


            const response = await axios.post(`${API_BASE_URL}/abha/forgot/mobile/send-otp`,
                {
                    loginId: encryptedMobile
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
                setStep("details_and_otp");
                toast.success(dtresponse?.data?.message);
                setResendTimer(60);
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

    const validateUserDetails = (userDetails) => {
        if (!userDetails.firstName?.trim()) {
            toast.error("First name is required");
            return false;
        }

        if (!userDetails.lastName?.trim()) {
            toast.error("Last name is required");
            return false;
        }

        if (!userDetails.dob?.trim()) {
            toast.error("Date of Birth is required");
            return false;
        }

        if (!userDetails.gender?.trim()) {
            toast.error("Gender is required");
            return false;
        }

        return true;
    };

    const handleVerifyOtp = async () => {
        try {
            setIsPageLoading(true);

            // Validate required fields

            const isValid = validateUserDetails(userDetails);
            if (isValid) {

                const encryptedOtp = await encryptString(otpTextValue);
                const sessionResponse = await createSession();
                const token = sessionResponse?.accessToken;
                const response = await axios.post(`${API_BASE_URL}/abha/forgot/mobile/verify-otp`,
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
                if (dtresponse.success) {
                    if (dtresponse.data.authResult === 'success') {
                        let account = null;

                        if (dtresponse.data && dtresponse.data.accounts && dtresponse.data.accounts.length > 0) {
                            for (let i = 0; i < dtresponse.data.accounts.length; i++) {
                                const acc = dtresponse.data.accounts[i];
                                const nameParts = acc.name.split(" ");
                                const apiFirstName = nameParts[0] || "";
                                const apiLastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
                                const apiMiddleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

                                let apiDob = acc.dob;
                                let userDobFormatted = userDetails.dob;

                                // Convert user's date from YYYY-MM-DD to DD-MM-YYYY
                                if (userDetails.dob.includes("-")) {
                                    const userDateParts = userDetails.dob.split("-");
                                    if (userDateParts.length === 3 && userDateParts[0].length === 4) {
                                        userDobFormatted = `${userDateParts[2]}-${userDateParts[1]}-${userDateParts[0]}`;
                                    }
                                }

                                const genderMatches =
                                    (acc.gender === "M" && userDetails.gender === "Male") ||
                                    (acc.gender === "F" && userDetails.gender === "Female") ||
                                    (acc.gender === userDetails.gender);

                                const firstNameMatches = apiFirstName.toLowerCase() === userDetails.firstName.toLowerCase();
                                const lastNameMatches = apiLastName.toLowerCase() === userDetails.lastName.toLowerCase();
                                const middleNameMatches =
                                    (!apiMiddleName && !userDetails.middleName) ||
                                    (apiMiddleName.toLowerCase() === userDetails.middleName.toLowerCase());
                                const dobMatches = apiDob === userDobFormatted;

                                if (firstNameMatches && lastNameMatches && middleNameMatches && dobMatches && genderMatches) {
                                    account = acc;
                                    break; // Stop at first match
                                }
                            }

                            if (account) {
                                // Account matched, proceed to verify
                                if (dtresponse.data?.token) {
                                    const verifyUserObj = await verifyUser(
                                        token,
                                        dtresponse.data.token,
                                        account.ABHANumber,
                                        dtresponse.data.txnId
                                    );

                                    if (verifyUserObj?.data?.token) {
                                        localStorage.setItem("x_token", verifyUserObj?.data?.token);

                                        const abhaProfileData = await getAbhaProfile(token, verifyUserObj?.data?.token);

                                        if (abhaProfileData?.success) {
                                            toast.success(dtresponse.data.message || "ABHA profile data fetched successfully.");
                                            localStorage.setItem("orignalBeneficiaryData", JSON.stringify(abhaProfileData.data));
                                            localStorage.setItem("abhaProfileData", JSON.stringify(dtresponse.data));
                                            setTimeout(() => {
                                                setIsPageLoading(false);
                                                navigate('/abha-Card');
                                            }, 3000);
                                        } else {
                                            toast.error(abhaProfileData?.message || "Failed to fetch ABHA profile data. Please try again.");
                                            setIsPageLoading(false);
                                        }
                                    } else {
                                        setIsPageLoading(false);
                                        toast.error("Something went wrong");
                                    }
                                } else {
                                    setIsPageLoading(false);
                                    toast.error(dtresponse.data?.message);
                                }
                            } else {
                                // No matching account found
                                setIsPageLoading(false);
                                toast.error("Details do not match with any record. Please verify and try again.");
                            }
                        } else {
                            setIsPageLoading(false);
                            toast.error("Unable to verify details. Please try again.");
                        }
                    } else {
                        toast.error(dtresponse?.data?.message || "Wrong OTP. Please try again.");
                        setIsPageLoading(false);
                        return;
                    }

                } else {
                    setIsPageLoading(false);
                    toast.error("Unable to verify details. Please try again.");
                }
            } else {
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
        } finally {
            setIsPageLoading(false);
        }
    };
    return (
        <>
            <ToastContainer />
            {isPageLoading && <Loader />}
            <div className="flow-feilds">
                {step === "mobile" && (
                    <div className="feilds">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            className="filds-form"
                            onChange={handleForgot}
                            value={mobile}
                            placeholder="Enter Mobile Number"
                            name="mobile-verify"
                            maxLength={10}
                            autoComplete="off"
                        />
                    </div>
                )}

                {step === "details_and_otp" && (
                    <>
                        <div className="flowTitle">
                            <h4>Enter your details and OTP received on your mobile</h4>
                        </div>
                        <div className="retrieve-adhar-details">
                            <div className="row">
                                <div className="col-xs-12 col-md-4">
                                    <div className="feilds">
                                        <label>First name*</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="First name*"
                                            name="firstName"
                                            value={userDetails.firstName}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <div className="feilds">
                                        <label>Middle name</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="Middle name"
                                            name="middleName"
                                            value={userDetails.middleName}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <div className="feilds">
                                        <label>Last name*</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="Last name*"
                                            name="lastName"
                                            value={userDetails.lastName}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <div className="feilds">
                                        <label>Date of birth *</label>
                                        <input
                                            type="date"
                                            className="filds-form"
                                            name="dob"
                                            value={userDetails.dob}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-8">
                                    <div className="feilds">
                                        <label>Gender*</label>
                                        <div className="gendareSection">
                                            <label>
                                                <input
                                                    type="radio"
                                                    className="filds-form"
                                                    name="gender"
                                                    checked={userDetails.gender === "Male"}
                                                    onChange={() => handleGenderChange("Male")}
                                                />Male
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    className="filds-form"
                                                    name="gender"
                                                    checked={userDetails.gender === "Female"}
                                                    onChange={() => handleGenderChange("Female")}
                                                />Female
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    className="filds-form"
                                                    name="gender"
                                                    checked={userDetails.gender === "Transgender"}
                                                    onChange={() => handleGenderChange("Transgender")}
                                                />Transgender
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="feilds">
                                        <label>Enter OTP</label>
                                        <input
                                            type="text"
                                            className="filds-form"
                                            placeholder="Enter OTP"
                                            maxLength={6}
                                            value={otpTextValue}
                                            onChange={handleOtpChange}
                                            autoComplete="off"
                                        />
                                        <span
                                            className="notes text-end"
                                            onClick={() => {
                                                if (resendTimer === 0) handleSendOtp(); // Only call if timer expired
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
                                </div>
                            </div>
                        </div>
                    </>
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
                    <p>I, hereby declare that I am voluntarily sharing my mobile number and demographic information with National Health Authority (NHA) </p>
                    <span className="readMore">Read More</span>
                </div>
            </label>

            <div className="flow-feilds pb-3" style={{ minHeight: 'auto' }}>
                <div className="feilds feildsBtn">
                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                    <button
                        className={`custBtn ${step === "mobile"
                            ? mobile.length === 10 && termsAccepted ? 'btnSuccess' : 'disabled'
                            : step === "details_and_otp"
                                ? otpTextValue.length === 6 && termsAccepted ? 'btnSuccess' : 'disabled'
                                : 'btnSuccess'
                            }`}
                        disabled={
                            step === "mobile"
                                ? mobile.length !== 10 || !termsAccepted
                                : step === "details_and_otp"
                                    ? otpTextValue.length !== 6 || !termsAccepted
                                    : false
                        }
                        onClick={
                            step === "mobile" ? handleSendOtp :
                                step === "details_and_otp" ? handleVerifyOtp : null
                        }
                    >
                        {step === "mobile" ? "Send OTP" :
                            step === "details_and_otp" ? "Verify OTP" :
                                "Submit"} <i className="material-icons">arrow_right_alt</i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ForgoatMobileNumber;
