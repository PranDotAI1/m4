import React, { useState, useEffect, useContext } from "react";
import MixLogo from '../../assets/images/logo-mix.svg';
import SucessImg from '../../assets/images/comman/success.svg';
import MobileIcon from '../../assets/images/comman/mobileNumber.png'
import AadharIcon from '../../assets/images/comman/AadharNumber.png'
import ABHANumber from '../../assets/images/comman/abhaNumber.png'
import LoginABHANumber from '../../components/Login-ABHA/LoginABHANumber';
import LoginAadharNumber from '../../components/Login-ABHA/LoginAadharNumer';
import LoginMobileNumber from '../../components/Login-ABHA/LoginMobileNumer';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import { encryptString, createSession, getAbhaProfile, verifyUser } from "../../services/apiUtils";
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { API_BASE_URL } from "../../config";

const RetrieveEnrollment = () => {

    const [aadharDetails, setAadharDetails] = useState(false);
    const [showEnrollment, setShowEnrollment] = useState(false);
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [mobile, setMobile] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [accessToken, setaccessToken] = useState("");
    const [txnId, settxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [abhaNumber, setAbhaNumber] = useState("");
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "Male"
    });


    const navigate = useNavigate();
    const back = () => {
        navigate('/abha-home');
    }
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
    /**
     * Function used to set checkbox value
     */
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    // Countdown logic using useEffect
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [resendTimer]);

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
                        const url = `${API_BASE_URL}/abha/retrieval/send-otp`;
                        const param = {
                            loginId: encyptMobile,
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
                            setAadharDetails(true);
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
    /**
     * Functin used to verify abha number
     */

    const verifyMobileOtp = async () => {
        try {
            if (!OtpText) {
                toast.error("Please enter OTP.");
            } else {
                // Validate required fields

                const isValid = validateUserDetails(userDetails);
                if (isValid) {
                    setIsPageLoading(true);
                    const encryptedOtp = await encryptString(OtpText);
                    if (encryptedOtp) {
                        const url = `${API_BASE_URL}/abha/retrieval/verify-otp`;
                        const param = {
                            txnId: txnId,
                            otp: encryptedOtp,
                        };
                        const header = {
                            headers: {
                                'Content-Type': 'application/json',
                                'accesstoken': accessToken,
                            }
                        };
                        const response = await axios.post(url, param, header);
                        const dtResponse = response.data;
                        if (dtResponse.success) {
                            if (dtResponse.data.authResult === 'success') {
                                let account = null;

                                if (dtResponse.data && dtResponse.data.accounts && dtResponse.data.accounts.length > 0) {
                                    for (let i = 0; i < dtResponse.data.accounts.length; i++) {
                                        const acc = dtResponse.data.accounts[i];
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
                                        setIsPageLoading(false);
                                        setShowEnrollment(true);
                                        setAbhaNumber(account.enrolmentNumber);
                                        toast.success(dtResponse?.data?.message || "OTP verified successfully.");
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
                                toast.error(dtResponse?.data?.message || "Wrong OTP. Please try again.");
                                setIsPageLoading(false);
                                return;
                            }

                        } else {
                            toast.error(dtResponse?.message || "Failed to verify OTP. Please try again.");
                            setIsPageLoading(false);
                        }
                    } else {
                        setIsPageLoading(false);
                        toast.error("Encryption failed. Please try again.");
                    }
                } else {
                    setIsPageLoading(false);
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
            <ToastContainer />
            {isPageLoading && <Loader />}
            <div className="mainFlow">
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} />
                        </div>
                        <div className="userFlowAdharVer anotherPaddingPage pb-4">
                            <div className="flowTitle">
                                <h4>Enrolment Number Retrieval</h4>
                            </div>

                            <div className="flow-feilds">
                                {/* <div className="feilds">
                                    <label>Mobile Number</label>
                                    <input type="text" className="filds-form" placeholder="Enter mobile"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="feilds">
                                    <span className="notes">OTP sent to Aadhaar registered mobile number ending with ******3210</span>
                                    <label>Confirm OTP</label>
                                    <input type="text" className="filds-form" placeholder="Enter OTP" maxLength={6} />
                                    <span className="notes text-end">00:60Resend OTP</span>
                                </div> */}

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
                            </div>
                            <label className="terms-condition-section" for="termsConditionClick">
                                <input type="checkbox" id="termsConditionClick" value="1" onClick={handleCheckboxChange} />
                                <div className="terms-condition-right">
                                    <h4>I agree to Terms and Conditions</h4>
                                    <p>I, hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, with National Health Authority (NHA) </p>
                                    <span className="readMore">Read More</span>
                                </div>
                            </label>
                            {aadharDetails && (
                                <>
                                    <hr />
                                    <div className="flowTitle">
                                        <h4>Enter the below details as per Aadhaar details to proceed</h4>
                                    </div>
                                    <div className="retrieve-adhar-details">
                                        <div className="row">
                                            <div className="col-xs-12 col-md-4">
                                                <div className="feilds">
                                                    <label>First name*</label>
                                                    <input type="text" className="filds-form" placeholder="First Name*" value={userDetails.firstName} onChange={handleInputChange} autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="feilds">
                                                    <label>Middle name</label>
                                                    <input type="text" className="filds-form" placeholder="Middle Name" value={userDetails.middleName} onChange={handleInputChange} autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="feilds">
                                                    <label>Last name*</label>
                                                    <input type="text" className="filds-form" placeholder="Last name*" value={userDetails.lastName} onChange={handleInputChange} autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="feilds">
                                                    <label>Date of birth *</label>
                                                    <input type="date" className="filds-form" value={userDetails.dob} onChange={handleInputChange} autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-8">
                                                <div className="feilds">
                                                    <label>Gender*</label>
                                                    <div className="gendareSection">
                                                        <label>
                                                            <input type="radio" className="filds-form" name="gender" checked={userDetails.gender === "Male"} onChange={() => handleGenderChange("Male")}/>Male
                                                        </label>
                                                        <label>
                                                            <input type="radio" className="filds-form" name="gender" checked={userDetails.gender === "Female"} onChange={() => handleGenderChange("Female")} />Female
                                                        </label>
                                                        <label>
                                                            <input type="radio" className="filds-form" name="gender" checked={userDetails.gender === "Transgender"} onChange={() => handleGenderChange("Transgender")} />Transgender
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flow-feilds" style={{ minHeight: 'auto' }}>
                                <div className="feilds feildsBtn">
                                    <button className="custBtn btnCancel" onClick={back}>Back</button>
                                    <button className={`custBtn ${(mobile.length == 10 && isChecked) ? 'btnSuccess' : 'disabled'}`} disabled={mobile.length !== 10} onClick={!showOtpBox ? handleSendOtp : verifyMobileOtp}> {!showOtpBox ? 'Get OTP' : 'Verify'} <i className="material-icons">arrow_right_alt</i></button>
                                </div>
                            </div>
                            {showEnrollment && (
                                <>
                                    <div className="successMessage">
                                        <div className="successImg">
                                            <img src={SucessImg} />
                                        </div>
                                        <h4>Hi Raghavendra Mishra, your enrolment number is:</h4>
                                        <div className="copyClicpMessage">
                                            <span className="number">{abhaNumber}</span>
                                            <span className="copyIcon"><i className="material-icons">content_copy</i></span>
                                        </div>
                                        <div className="feilds feildsBtn">
                                            <button className="custBtn btnThems">Home page</button>
                                            <button className="custBtn btnThems" >Login to ABHA</button>
                                        </div>
                                    </div>
                                </>

                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RetrieveEnrollment