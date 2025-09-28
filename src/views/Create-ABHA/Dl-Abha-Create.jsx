import React, { useState } from "react";
import Consent from "../../components/Create-ABHA/AbhaConsent"
import ProgressBar from "../../components/Create-ABHA/ProgressBar";
import Authentication from "../../components/Create-ABHA/Authentication";
import AbhaDlProfile from "../../components/Create-ABHA/AbhaDlProfile";
import AbhaEnrolment from "../../components/Create-ABHA/AbhaEnrolment";

import MixLogo from "../../assets/images/logo-mix.svg";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Loader from '../../components/common/Loader';

import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { v4 as uuidv4 } from 'uuid';

import { encryptString, createSession, getAbhaProfile, verifyUser } from "../../services/apiUtils";
import { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';

const DLabhaRegistration = () => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [txnId, settxnId] = useState("");
    const [resendTimer, setResendTimer] = useState("");
    const [OtpText, setOtpText] = useState("");
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [profileData, setFormData] = useState({
        mobile: mobile,
        dlNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "M",
        pincode: "",
        address: "",
        state: "9",
        district: "176",
        termsAccepted: false,
        dlFront: "",
        dlBack: ""
    });

    const newErrors = {};

    useEffect(() => {
        console.log("profile data state: ", profileData);
    }, [profileData]);

    const handleTermChecked = (e) => {
        setIsChecked(e.target.checked);
        setFormData({
            ...profileData,
            ['termsAccepted']: e.target.checked,
        });
    };

    const validateImage = (file, type) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSizeKB = 100;

        if (!allowedTypes.includes(file.type)) {
            if (type == 'front') {
                setErrors({
                    ...errors,
                    ["dlFront"]: 'Only JPEG and PNG formats are allowed.',
                });
            } else {
                setErrors({
                    ...errors,
                    ["dlBack"]: 'Only JPEG and PNG formats are allowed.',
                });
            }

            return false;
        }

        if (file.size > maxSizeKB * 1024) {
            if (type == 'front') {
                setErrors({
                    ...errors,
                    ["dlFront"]: 'Image must be less than 100 KB.',
                });
                newErrors.dlBack = 'Image must be less than 100 KB.';
            } else {
                setErrors({
                    ...errors,
                    ["dlBack"]: 'Image must be less than 100 KB.',
                });
                newErrors.dlBack = 'Image must be less than 100 KB.';
            }
            return false;
        }

        return true;
    };

    const convertToBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // remove prefix
            callback(base64String); // use in your API payload
        };

        reader.onerror = (error) => {
            console.error('Error converting image to Base64:', error);
        };
    };

    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (!file || !validateImage(file, type)) return;

        convertToBase64(file, (base64Image) => {
            console.log('Base64 Image:', base64Image);
            if (type == 'front') {
                setFormData({
                    ...profileData,
                    ['dlFront']: base64Image,
                });
                setErrors({
                    ...errors,
                    ["dlFront"]: '',
                });
            } else {
                setFormData({
                    ...profileData,
                    ['dlBack']: base64Image,
                });
                setErrors({
                    ...errors,
                    ["dlBack"]: '',
                });
            }
        });
    };

    const isValidDL = (dlNumber) => {
        const pattern = /^[A-Z]{2}\d{2}\d{4}\d{7}$/;
        return pattern.test(dlNumber.toUpperCase());
    };

    // Validate input fields
    const validate = () => {

        if (!profileData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(profileData.mobile.trim())) {
            newErrors.mobile = 'Enter valid 10-digit mobile';
        }

        if (!profileData.dlNumber.trim()) {
            newErrors.dlNumber = 'DL number is required';
        } else if (!isValidDL(profileData.dlNumber.trim())) {
            newErrors.dlNumber = 'Please enter valid DL number';
        }

        if (!profileData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }

        if (!profileData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

        if (!profileData.dob.trim()) {
            newErrors.dob = 'DOB is required';
        }

        if (!profileData.gender.trim()) {
            newErrors.gender = 'Gender is required';
        }

        if (!profileData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(profileData.pincode.trim())) {
            newErrors.pincode = 'Please enter valid pincode';
        }

        if (!profileData.state.trim()) {
            newErrors.state = 'State is required';
        }

        if (!profileData.district.trim()) {
            newErrors.district = 'State is required';
        }

        if (!profileData.dlFront.trim()) {
            newErrors.dlFront = 'DL front image is required';
        }

        if (!profileData.dlBack.trim()) {
            newErrors.dlBack = 'DL back image is required';
        }

        if (!profileData.termsAccepted) {
            newErrors.termsAccepted = 'Please accept the term & conditions';
        }

        return newErrors;
    };

    // Update form data on input change
    const handleChange = (e) => {
        setFormData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
        // Clear error for the field as the user types
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const sendOtpRequest = async (encyptMobile, accessToken) => {
        try {

            const url = `${API_BASE_URL}/abha/dl/enroll/send-otp`;
            const param = {
                loginId: encyptMobile,
            };
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken,
                },
            };
            const response = await axios.post(url, param, header);
            return response.data;
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

    /**
     * Functin used to verify abha number
     */
    const verifyOtp = async () => {
        setIsPageLoading(true);
        try {
            const encryptedOtp = await encryptString(OtpText);
            if (encryptedOtp) {
                const url = `${API_BASE_URL}/abha/dl/enroll/verify-otp`;
                const param = {
                    txnId: txnId,
                    otpValue: encryptedOtp,
                };
                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        'accesstoken': accessToken,
                    },
                };
                const response = await axios.post(url, param, header);
                return response.data
            } else {
                toast.error("Something went wrong!!");
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
        } finally {
            setIsPageLoading(false);
        }
    }

    /**
     * Functin used to verify abha number
     */
    const dlEnrollment = async () => {
        try {
            console.log("txnId : ", txnId);
            const url = `${API_BASE_URL}/abha/dl/enroll/create-enroll-number`;
            const param = {
                "txnId": txnId,
                "documentType": "DRIVING_LICENCE",
                "documentId": profileData.dlNumber,
                "firstName": profileData.firstName,
                "middleName": profileData.middleName,
                "lastName": profileData.lastName,
                "dob": profileData.dob,
                "gender": profileData.gender,
                "frontSidePhoto": profileData.dlFront,
                "backSidePhoto": profileData.dlBack,
                "address": profileData.address,
                "state": profileData.state,
                "district": profileData.district,
                "pinCode": profileData.pincode
            };
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken,
                },
            };
            const response = await axios.post(url, param, header);
            return response.data

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
        } finally {
            //console.log('error');
        }
    }

    const handleNext = async () => {
        // Create session
        let sessionResponse = [];
        switch (step) {
            case 1:
                setIsPageLoading(true);
                sessionResponse = await createSession();
                // Encrypt Aadhaar
                const encyptMobile = await encryptString(mobile);
                if (encyptMobile && sessionResponse?.accessToken) {
                    setAccessToken(sessionResponse?.accessToken);
                    try {
                        const dtResponse = await sendOtpRequest(encyptMobile, sessionResponse.accessToken);
                        if (dtResponse?.success) {
                            toast.success(dtResponse?.data?.message);
                            settxnId(dtResponse?.data?.txnId);
                            setStep((prev) => prev + 1);
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
                    } finally {
                        setIsPageLoading(false);
                    }
                } else {
                    setIsPageLoading(false);
                    setErrorMessage("Failed to encrypt mobile. Please try again.");
                }
                break;
            case 2:
                setIsPageLoading(true);
                try {
                    console.log(OtpText);
                    if (OtpText && txnId) {
                        const dtResponse = await verifyOtp();
                        if (dtResponse?.success) {
                            toast.success(dtResponse?.data?.data?.message);
                            settxnId(dtResponse?.data?.data?.txnId);
                            setStep((prev) => prev + 1);
                            setIsPageLoading(false);
                        } else {
                            toast.error("Something went wrong!!");
                        }
                    } else {
                        toast.error("Something went wrong 11!!");
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
                } finally {
                    setIsPageLoading(false);
                }
            case 3:
                try {
                    const formErrors = validate();
                    console.log(formErrors);
                    if (Object.keys(formErrors).length === 0) {
                        setIsPageLoading(true);
                        sessionResponse = await createSession();
                        if (sessionResponse?.accessToken) {
                            setAccessToken(sessionResponse?.accessToken);
                            const response = await dlEnrollment();
                            console.log(response);
                            setIsPageLoading(false);
                        }
                    } else {
                        // Set errors to display them to the user
                        setErrors(formErrors);
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
                break;
            default:
                break;
        }

    }
    const handleBack = () => setStep((prev) => prev - 1);

    const navigate = useNavigate();
    const back = () => {
        navigate('/abha-home');
    };

    /**
     * function used to set abha no.
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
                        <div className="userFlowAdharVer dl-create-ABHA ">
                            <div className="backArrow" onClick={back}>
                                <i className="material-icons">
                                    keyboard_backspace
                                </i>
                            </div>

                            <div className="flow-feilds dl-flow-feilds">
                                <div className="steperFlow">
                                    <ProgressBar step={step} />
                                </div>
                                {step === 1 && <Consent mobile={mobile} handleMobileChange={handleMobileChange} handleNext={handleNext} />}
                                {step === 2 && <Authentication OtpText={OtpText} handleOtpChange={handleOtpChange} handleNext={handleNext} handleBack={handleBack} errorMessage={errorMessage} />}
                                {step === 3 && <AbhaDlProfile handleNext={handleNext} handleBack={handleBack} profileData={profileData} errors={errors} handleChange={handleChange} handleTermChecked={handleTermChecked} handleImageUpload={handleImageUpload} />}
                                {step === 4 && <AbhaEnrolment handleBack={handleBack} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default DLabhaRegistration;
