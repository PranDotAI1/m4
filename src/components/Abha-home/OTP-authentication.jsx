import React, { useState, useContext } from "react";
import { encryptString, createSession, userLogout } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';
import { ToastContainer, toast } from "react-toastify";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { useNavigate } from 'react-router-dom';


const OTPAuthentication = ({ onClose, setShowModal }) => {

    const [OtpText, setOtpText] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);

    const { setDataByKey } = useContext(GlobalContext)
    const { getDataByKey } = useContext(GlobalContext);

    const txnId = getDataByKey('txnId');
    const xToken = getDataByKey('xToken');
    const verifyWith = getDataByKey('verifyWith');

    const navigate = useNavigate();
    const handleLogout = () => {
        userLogout(navigate);
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
       * Functin used to verify abha number
       */
    const verifyOtp = async (event) => {
        event.preventDefault();
        setIsPageLoading(true);
        try {
            const encryptedOtp = await encryptString(OtpText);
            if (encryptedOtp) {

                const sessionResponse = await createSession();
                const accessToken = sessionResponse?.accessToken;

                if (!accessToken) {
                    toast.error('Access token or X-token is missing.');
                    return;
                }
                let param = {};
                let url = "";
                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        'xtoken': `${xToken}`,
                        'accesstoken': `${accessToken}`,
                    }
                };
                if (verifyWith == 'mobile') {
                    url = `${API_BASE_URL}/abha/update/mobile/verify-otp`;
                    param = {
                        "txnId": `${txnId}`,
                        "otp": `${encryptedOtp}`
                    }
                } else {
                    url = `${API_BASE_URL}/abha/update/email/verify-otp`;
                    param = {
                        "txnId": `${txnId}`,
                        "otp": `${encryptedOtp}`
                    }
                }
                const response = await axios.post(url, param, header);
                const dtResponse = response.data;
                if (dtResponse.success) {
                    if (dtResponse?.data?.authResult === 'success') {
                        toast.error(dtResponse.data.message || "Wrong OTP. Please try again.");
                        setDataByKey('txnId', dtResponse.data.txnId)
                        setIsPageLoading(false);
                        setTimeout(() => {
                            setShowModal(false);
                        }, 3000);
                    } else {
                        toast.error(dtResponse.data.message);
                        setDataByKey('txnId', dtResponse.data.txnId)
                        setIsPageLoading(false);
                    }
                } else {
                    toast.error(dtResponse?.message || "Failed to verify OTP. Please try again.");
                    setIsPageLoading(false);
                }
            } else {
                toast.error("Failed to encrypt OTP. Please try again.");
                setIsPageLoading(false);
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
            <ToastContainer />
            {isPageLoading && <Loader />}
            <div className="modal fade show d-block verificationModel" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 flex-column-reverse">
                            <div className="text-center headerText">
                                <h5 className="modal-title" id="exampleModalLabel">OTP Authentication</h5>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <div className="veryFicationType">
                                <div className="feilds mb-2 w-75">
                                    <label>Confirm OTP</label>
                                    <input type="text" className="form-control" placeholder="Enter OTP" maxLength={6} value={OtpText} onChange={handleOtpChange} />
                                    <span className="notes text-end">00:60 Resend OTP</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="custBtn btnCancel" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                            <button type="button" className="custBtn btnSuccess" onClick={verifyOtp}>Validate</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OTPAuthentication;