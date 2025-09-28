import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { encryptString, createSession, userLogout, encryptFile } from "../../services/apiUtils";
import Loader from '../../components/common/Loader';
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import Header from "../../components/common/Header";
import MixLogo from '../../assets/images/logo-mix.svg'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import OTPAuthentication from "../../components/Abha-home/OTP-authentication";
import SidebarMenu from "../../components/Abha-home/ABHA-SidebarMenu";


const UserProfileABDM = () => {
    const [abhaProfile, setAbhaProfile] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [verifyMobile, setVerifyMobile] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [verifyWith, setVerifyWith] = useState("");
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [xToken, setXToken] = useState('');
    const [txnId, settxnId] = useState("");
    const hiddenFileInput = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {
        const storedProfile = localStorage.getItem("orignalBeneficiaryData");
        if (storedProfile) {
            setAbhaProfile(JSON.parse(storedProfile));
        }
        const x_token = localStorage.getItem("x_token");
        if (x_token) {
            setXToken(x_token)
            setDataByKey('xToken', x_token)
        }
    }, []);
    useEffect(() => {
        const base64Prefix = "data:image/png;base64,";
        const base64String = abhaProfile ? base64Prefix + abhaProfile.profilePhoto : null;
        if (base64String) {
            setProfilePhoto(base64String);
        }
    }, [abhaProfile]);

    useEffect(() => {
        setVerifyMobile(abhaProfile?.mobile || '');
        setVerifyEmail(abhaProfile?.email || '');
    }, [profilePhoto]);

    const { setDataByKey } = useContext(GlobalContext)
    const { getDataByKey } = useContext(GlobalContext);
    useEffect(() => {
        setDataByKey('errorMessage', errorMessage)
    }, [errorMessage]);

    useEffect(() => {
        setDataByKey('txnId', txnId)
    }, [txnId]);

    useEffect(() => {
        setVerifyWith(verifyWith);
        setDataByKey('verifyWith', verifyWith)
    }, [verifyWith]);

    const handleLogout = () => {
        setTimeout(() => {
            userLogout(navigate);
        }, 5000);

    };

    const handleVerification = async (event) => {
        let verifyBy = (event == 'mobile') ? verifyMobile : verifyEmail;
        setVerifyWith(event);
        setErrorMessage("");
        setIsPageLoading(true);
        try {
            if (verifyBy) {
                // Encrypt mobile
                const encryptedValue = await encryptString(verifyBy);
                if (!encryptedValue) {
                    setIsPageLoading(false);
                    toast.error("Failed to encrypt. Please try again.");
                    return;
                }

                // Create session
                const sessionResponse = await createSession();
                if (!sessionResponse?.accessToken) {
                    setIsPageLoading(false);
                    toast.error(sessionResponse?.error?.message || "Failed to create session.");
                    return;
                } else {
                    setDataByKey('accessToken', sessionResponse.accessToken)
                }
                let param = {};
                let url = "";
                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        'xtoken': `${xToken}`,
                        'accesstoken': `${getDataByKey('accessToken')}`,
                    }
                };
                if (event == 'mobile') {
                    url = `${API_BASE_URL}/abha/update/mobile/send-otp`;
                    param = {
                        "loginId": encryptedValue
                    };
                } else {
                    url = `${API_BASE_URL}/abha/update/email/send-otp`;
                    param = {
                        "loginId": encryptedValue
                    };
                }
                const response = await axios.post(url, param, header);
                const dtResponse = response.data;
                if (dtResponse.success) {
                    setIsPageLoading(false);
                    toast.success(dtResponse.data.message || "OTP Sent on your email");
                    settxnId(dtResponse.data.txnId);
                    setTimeout(() => {
                        setShowModal(true);
                    }, 2000);
                }
            } else {
                setIsPageLoading(false);
                toast.error("Please enter a valid mobile number or email");
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

    const calculateAge = (dateString) => {
        const [day, month, year] = dateString.split('-');
        const birthDate = new Date(`${year}-${month}-${day}`);
        if (isNaN(birthDate.getTime())) {
            return null; // or return 'Invalid date'
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleBrowsImage = () => {
        hiddenFileInput.current.click(); // Trigger the input click
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        try {
            if (file) {
                setIsPageLoading(true);
                const encryptedImage = await encryptFile(file);
                const requestData = {
                    photo: encryptedImage, // ABDM expects encrypted or base64 image
                };
                const sessionResponse = await createSession();
                const accessToken = sessionResponse?.accessToken;
                const xToken = localStorage.getItem("x_token");
                const response = await axios.patch(
                    `${API_BASE_URL}/abha/profile/photo`,
                    requestData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'xtoken': xToken,
                            'accesstoken': accessToken,
                        }
                    }
                );
                const dtResponse = response.data;
                if (dtResponse.success) {
                    console.log(dtResponse.data);
                    localStorage.setItem("orignalBeneficiaryData", JSON.stringify(dtResponse.data));
                    setIsPageLoading(false);
                    toast.success('Photo updated successfully!');
                } else {
                    setIsPageLoading(false);
                    toast.error('Profile photo update failed');
                }
            } else {
                toast.error('Error uploading photo');
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


        console.log('Selected file:', file);
    };


    return (
        <>
            <ToastContainer />
            {isPageLoading && <Loader />}
            {showModal &&
                (<OTPAuthentication onClose={() => setShowModal(false)} setShowModal={setShowModal} />)
            }
            <div className="mainFlow">
                <Header />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} />
                        </div>
                        <div className="userFlowAdharVer">
                            {/* <div className="flowTitle">
                                <h4>Set your PHR (ABDM) Address</h4>
                                <p>Basic profile information is captured from Aadhar</p>
                            </div> */}
                            <div className="user-profile-dashboard">
                                {/* <div className="leftDashbirdMenu">
                                    <ul>
                                        <li><a href="/abha-Card">ABHA Card</a></li>
                                        <li><a className="active" href="/my-profile">My Profile</a></li>
                                        <li><a href="/manage-ABHA-profile">Manage ABHA Profile</a></li>
                                        <li><a href="/manage-password">Manage Password</a></li>
                                        <li><a href="/delete-deactivate-account">Delete/Deactivate</a></li>
                                        <li><a href="/re-KYC">Re-KYC</a></li>
                                        <li><a href="/login-ABHA">Logout</a></li>
                                    </ul>
                                </div> */}
                                <SidebarMenu activePage="profile" />
                                <div className="centerBoard">
                                    <div className="rightProfileMain withoutBorder myProfilePage">
                                        {/* <div className="profileBanner">
                                            <img src={ProfleBanner} />
                                        </div> */}
                                        <div className="profileUser">
                                            <div className="profileContent">
                                                <h4>{abhaProfile ? abhaProfile.name : ''}</h4>
                                                <p>{abhaProfile ? (abhaProfile.gender == 'M') ? 'Male' : (abhaProfile.gender == 'F') ? 'Female' : '' : ''} - {calculateAge(abhaProfile ? (abhaProfile.dayOfBirth + '-' + abhaProfile.monthOfBirth + '-' + abhaProfile.yearOfBirth) : '1970')} year old</p>
                                            </div>
                                        </div>
                                        <div className="abhaNumber">
                                            <h4>Address</h4>
                                            <p>{abhaProfile ? abhaProfile.address : ''}</p>
                                        </div>
                                        <div className="phrAddress">
                                            <div className="feilds mb-2">
                                                <label>Mobile Number</label>
                                                <input type="text" value={verifyMobile} onChange={(e) => setVerifyMobile(e.target.value)} className={`form-control ${abhaProfile?.mobileVerified ? 'is-valid' : 'is-invalid'}`} placeholder="Enter Mobile Number" />
                                                {abhaProfile?.mobileVerified && (
                                                    <span className="verify" onClick={() => handleVerification("mobile")}>Verify</span>
                                                )}
                                                {(errorMessage && (verifyWith == 'mobile')) && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
                                            </div>
                                            <div className="feilds">
                                                <label>Email Address</label>
                                                <input type="text" onChange={(e) => setVerifyEmail(e.target.value)} value={verifyEmail} className={`form-control ${abhaProfile?.emailVerified ? 'is-valid' : 'is-invalid'}`} />
                                                {abhaProfile?.mobileVerified && (
                                                    <span className="verify" onClick={() => handleVerification("email")} >Verify</span>
                                                )}
                                                {(errorMessage && (verifyWith == 'email')) && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
                                            </div>
                                        </div>
                                        <div className="abhaNumber">
                                            <h4>District</h4>
                                            <p>{abhaProfile ? abhaProfile.districtName : ''}</p>
                                        </div>
                                        <div className="abhaNumber dateOfBirthday">
                                            <div>
                                                <h4>State</h4>
                                                <p>{abhaProfile ? abhaProfile.stateName : ''}</p>
                                            </div>
                                            <div>
                                                <h4>Pincode</h4>
                                                <p>{abhaProfile ? abhaProfile.pincode : ''}</p>
                                            </div>
                                        </div>
                                        {/* <div className="scanner">
                                            <div className="scannerImg">
                                                <img src={Scanner} />
                                            </div>
                                            <div className="scannerShare">
                                                <p>Share <i class="material-icons">
                                                    share
                                                </i></p>
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                                <div className="rightDashBord">
                                    <div className="profileImg">
                                        <img src={profilePhoto} />
                                        {/* Hidden Input */}
                                        <input type="file" ref={hiddenFileInput} onChange={handleFileChange} style={{ display: 'none' }} />
                                        <span className="icon" onClick={handleBrowsImage}><DriveFileRenameOutlineOutlinedIcon /></span>
                                        <p>Please upload JPG, JPEG file types. Maximum size allowed for the attachment is 100KB.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bottomDashboard">
                                {/* <div className="saveBtnProfile justify-content-center">
                                    <button className="custBtn btnThems">Cancel</button>
                                    <button className="custBtn disabled">Save</button>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfileABDM;