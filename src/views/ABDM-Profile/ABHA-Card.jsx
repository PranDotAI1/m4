import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/common/Header";
import MixLogo from '../../assets/images/logo-mix.svg'
import User from '../../assets/images/comman/user.png'
import ProfleBanner from '../../assets/images/comman/profile-banner.png'
import CopyText from "../../components/common/CopyClipboard";
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import SidebarMenu from "../../components/Abha-home/ABHA-SidebarMenu";
import { jsPDF } from "jspdf";
import { v4 as uuidv4 } from 'uuid';
import { createSession, userLogout } from "../../services/apiUtils";
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/common/Loader';
import { useNavigate } from 'react-router-dom';

const UserABHAcard = () => {

    const [abhaProfile, setAbhaProfile] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const hasFetched = useRef(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout(navigate);
    };

    useEffect(() => {
        const storedProfile = localStorage.getItem("orignalBeneficiaryData");
        console.log(storedProfile);
        if (storedProfile) {
            setAbhaProfile(JSON.parse(storedProfile));
        }
    }, []);

    useEffect(() => {
        const base64Prefix = "data:image/png;base64,";
        const base64String = abhaProfile ? base64Prefix + abhaProfile.profilePhoto : null;
        setProfilePhoto(base64String);
    }, [abhaProfile]);

    const fetchAbhaQrCode = async () => {
        try {
            setIsPageLoading(true);
            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;
            const xToken = localStorage.getItem('x_token');

            if (!accessToken || !xToken) {
                toast.error('Access token or X-token is missing.');
                setIsPageLoading(false);
                return;
            }

            const headers = {
                'accesstoken': accessToken,
                'xtoken': xToken,
                'REQUEST-ID': uuidv4(),
                'TIMESTAMP': new Date().toISOString(),
                'Accept': 'image/png',
            };

            const response = await axios.get(
                `${API_BASE_URL}/abha/profile/qrcode`,
                {
                    headers,
                    responseType: 'blob' // Important: Set response type to blob for image data
                }
            );

            if (response.data && response.data.size > 0) {
                // Create blob URL from the response
                const imageUrl = URL.createObjectURL(response.data);
                setQrCodeUrl(imageUrl);
                setIsPageLoading(false);
            } else {
                toast.error('QR code not found in response.');
                setIsPageLoading(false);
            }

        } catch (error) {
            setIsPageLoading(false);
            console.error('QR Code fetch error:', error);
            
            if (error.response && error.response.data) {
                // For blob responses, we need to convert to text first
                if (error.response.data instanceof Blob) {
                    const text = await error.response.data.text();
                    try {
                        const errorData = JSON.parse(text);
                        if (errorData.success === false && errorData.message === "X-token expired") {
                            toast.error(errorData.message);
                            setTimeout(() => {
                                handleLogout();
                            }, 3000);
                        } else {
                            toast.error(errorData.message || "Server error occurred. Please try again later.");
                        }
                    } catch (parseError) {
                        toast.error("Server error occurred. Please try again later.");
                    }
                } else {
                    // Regular JSON error response
                    if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                        toast.error(error.response.data.message);
                        setTimeout(() => {
                            handleLogout();
                        }, 3000);
                    } else {
                        toast.error(error.response.data.message || "Server error occurred. Please try again later.");
                    }
                }
            } else {
                toast.error("Network error occurred. Please try again later.");
            }
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAbhaQrCode();
        }
    }, []);

    const downloadABHACard = async () => {
        setIsPageLoading(true);

        try {
            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;
            const xToken = localStorage.getItem("x_token");

            if (!accessToken || !xToken) {
                throw new Error("Authentication failed. Please login again.");
            }

            const headers = {
                'REQUEST-ID': crypto.randomUUID(),
                'TIMESTAMP': new Date().toISOString(),
                'xtoken': xToken,
                'accesstoken': accessToken,
                'Accept': '*/*'
            };

            const response = await axios.get(`${API_BASE_URL}/abha/profile/abha-card`, { 
                headers,
                responseType: 'blob' // Important: Set response type to blob
            });

            if (!response.data || response.data.size === 0) {
                toast.error("No ABHA card data received from the server");
                setIsPageLoading(false);
                return;
            }

            // Determine file type from response headers
            const contentType = response.headers['content-type'] || 'application/pdf';
            const blob = new Blob([response.data], { type: contentType });

            if (contentType.includes('application/pdf')) {
                // Handle PDF download directly
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const abhaNumber = abhaProfile?.ABHANumber || '';
                link.download = `ABHA_Card${abhaNumber ? `_${abhaNumber}` : ''}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setIsPageLoading(false);
            } else {
                // Handle image (convert to PDF)
                const imageUrl = URL.createObjectURL(blob);
                const img = new Image();

                img.onload = () => {
                    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm' });
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();

                    const imgRatio = img.height / img.width;
                    let imgWidth = pdfWidth;
                    let imgHeight = imgWidth * imgRatio;

                    if (imgHeight > pdfHeight) {
                        imgHeight = pdfHeight;
                        imgWidth = imgHeight / imgRatio;
                    }

                    pdf.addImage(
                        img,
                        'PNG',
                        (pdfWidth - imgWidth) / 2,
                        (pdfHeight - imgHeight) / 2,
                        imgWidth,
                        imgHeight
                    );

                    const abhaNumber = abhaProfile?.ABHANumber || '';
                    const filename = `ABHA_Card${abhaNumber ? `_${abhaNumber}` : ''}.pdf`;
                    pdf.save(filename);

                    URL.revokeObjectURL(imageUrl);
                    setIsPageLoading(false);
                };

                img.onerror = () => {
                    toast.error("Failed to load ABHA card image.");
                    URL.revokeObjectURL(imageUrl);
                    setIsPageLoading(false);
                };

                img.src = imageUrl;
            }

        } catch (error) {
            setIsPageLoading(false);
            console.error('Download ABHA Card error:', error);
            
            if (error.response && error.response.data) {
                // For blob responses, we need to convert to text first
                if (error.response.data instanceof Blob) {
                    const text = await error.response.data.text();
                    try {
                        const errorData = JSON.parse(text);
                        if (errorData.success === false && errorData.message === "X-token expired") {
                            toast.error(errorData.message);
                            setTimeout(() => {
                                handleLogout();
                            }, 3000);
                        } else {
                            toast.error(errorData.message || "Server error occurred. Please try again later.");
                        }
                    } catch (parseError) {
                        toast.error("Server error occurred. Please try again later.");
                    }
                } else {
                    // Regular JSON error response
                    if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                        toast.error(error.response.data.message);
                        setTimeout(() => {
                            handleLogout();
                        }, 3000);
                    } else {
                        toast.error(error.response.data.message || "Server error occurred. Please try again later.");
                    }
                }
            } else {
                toast.error("Network error occurred. Please try again later.");
            }
        }
    };

    // Function to print ABHA card
    const printABHACard = async () => {
        try {
            setIsPageLoading(true);

            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;
            const x_token = localStorage.getItem("x_token");

            if (!accessToken) {
                throw new Error("Authentication token not found. Please login again.");
            }

            const requestId = crypto.randomUUID();
            const timestamp = new Date().toISOString();

            const response = await axios({
                method: 'GET',
                url: `${API_BASE_URL}/abha/profile/abha-card`,
                headers: {
                    'REQUEST-ID': requestId,
                    'xtoken': x_token,
                    'TIMESTAMP': timestamp,
                    'accesstoken': accessToken,
                    'Accept': '*/*'
                },
                responseType: 'blob' // Important: Set response type to blob
            });

            if (!response.data || response.data.size === 0) {
                toast.error("No ABHA card data received from the server");
                setIsPageLoading(false);
                return;
            }

            const contentType = response.headers['content-type'] || 'image/png';
            const blob = new Blob([response.data], { type: contentType });
            const imageUrl = window.URL.createObjectURL(blob);

            const img = new Image();

            img.onload = () => {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                const imgRatio = img.height / img.width;
                let imgWidth = pdfWidth - 20;
                let imgHeight = imgWidth * imgRatio;

                if (imgHeight > pdfHeight - 20) {
                    imgHeight = pdfHeight - 20;
                    imgWidth = imgHeight / imgRatio;
                }

                pdf.addImage(img, 'PNG',
                    (pdfWidth - imgWidth) / 2,
                    (pdfHeight - imgHeight) / 2,
                    imgWidth,
                    imgHeight
                );

                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);

                const printWindow = window.open(pdfUrl);

                printWindow.addEventListener('load', () => {
                    printWindow.print();
                    setTimeout(() => {
                        printWindow.close();
                        window.URL.revokeObjectURL(pdfUrl);
                        window.URL.revokeObjectURL(imageUrl);
                    }, 50000);
                }, { once: true });

                setIsPageLoading(false);
            };

            img.onerror = (error) => {
                toast.error("Failed to process the ABHA card image");
                window.URL.revokeObjectURL(imageUrl);
                setIsPageLoading(false);
            };

            img.src = imageUrl;

        } catch (error) {
            setIsPageLoading(false);
            console.error('Print ABHA Card error:', error);
            
            if (error.response && error.response.data) {
                if (error.response.data instanceof Blob) {
                    const text = await error.response.data.text();
                    try {
                        const errorData = JSON.parse(text);
                        if (errorData.success === false && errorData.message === "X-token expired") {
                            toast.error(errorData.message);
                            setTimeout(() => {
                                handleLogout();
                            }, 3000);
                        } else {
                            toast.error(errorData.message || "Server error occurred. Please try again later.");
                        }
                    } catch (parseError) {
                        toast.error("Server error occurred. Please try again later.");
                    }
                } else {
                    if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                        toast.error(error.response.data.message);
                        setTimeout(() => {
                            handleLogout();
                        }, 3000);
                    } else {
                        toast.error(error.response.data.message || "Server error occurred. Please try again later.");
                    }
                }
            } else if (error.request) {
                toast.error("No response from server. Please check your connection.");
            } else {
                toast.error("Something went wrong: " + error.message);
            }
        }
    };

    // Function to download and print PVC card
    const downloadAndPrintPVCCard = async () => {
        setIsPageLoading(true);

        try {
            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;
            const xToken = localStorage.getItem("x_token");

            if (!accessToken || !xToken) {
                throw new Error("Authentication failed. Please login again.");
            }

            const headers = {
                'REQUEST-ID': crypto.randomUUID(),
                'TIMESTAMP': new Date().toISOString(),
                'xtoken': xToken,
                'accesstoken': accessToken,
                'Accept': 'image/png',
            };

            const response = await axios.get(`${API_BASE_URL}/abha/profile/abha-card`, {
                headers,
                responseType: 'blob' // Important: Set response type to blob
            });

            if (!response.data || response.data.size === 0) {
                toast.error("No ABHA card data received from the server");
                setIsPageLoading(false);
                return;
            }

            const blob = new Blob([response.data], { type: response.headers['content-type'] || 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const cardWidth = 1012;
                const cardHeight = 638;

                canvas.width = cardWidth;
                canvas.height = cardHeight;

                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, cardWidth, cardHeight);

                const imgRatio = img.height / img.width;
                let imgWidth = cardWidth - 40;
                let imgHeight = imgWidth * imgRatio;

                if (imgHeight > cardHeight - 40) {
                    imgHeight = cardHeight - 40;
                    imgWidth = imgHeight / imgRatio;
                }

                ctx.drawImage(
                    img,
                    (cardWidth - imgWidth) / 2,
                    (cardHeight - imgHeight) / 2,
                    imgWidth,
                    imgHeight
                );

                const printWindow = window.open('', '_blank');
                if (!printWindow) {
                    toast.error("Pop-up blocked! Please allow pop-ups to print the PVC card.");
                    setIsPageLoading(false);
                    return;
                }

                printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ABHA PVC Card</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        img {
                            width: 85.6mm;
                            height: 54mm;
                        }
                        @media print {
                            @page {
                                size: 89mm 59mm;
                                margin: 0;
                            }
                        }
                    </style>
                </head>
                <body>
                    <img src="${canvas.toDataURL('image/png')}" alt="ABHA PVC Card" />
                    <script>
                        window.onload = function() {
                            setTimeout(() => {
                                window.print();
                                setTimeout(() => window.close(), 1000);
                            }, 500);
                        }
                    </script>
                </body>
                </html>
            `);

                printWindow.document.close();
                URL.revokeObjectURL(imageUrl);
                setIsPageLoading(false);
            };

            img.onerror = () => {
                toast.error("Failed to load ABHA card image.");
                URL.revokeObjectURL(imageUrl);
                setIsPageLoading(false);
            };

            img.src = imageUrl;

        } catch (error) {
            setIsPageLoading(false);
            console.error('PVC Card error:', error);
            
            if (error.response && error.response.data) {
                if (error.response.data instanceof Blob) {
                    const text = await error.response.data.text();
                    try {
                        const errorData = JSON.parse(text);
                        if (errorData.success === false && errorData.message === "X-token expired") {
                            toast.error(errorData.message);
                            setTimeout(() => {
                                handleLogout();
                            }, 3000);
                        } else {
                            toast.error(errorData.message || "Server error occurred. Please try again later.");
                        }
                    } catch (parseError) {
                        toast.error("Server error occurred. Please try again later.");
                    }
                } else {
                    if (error.response.data.success === false && error.response.data.message === "X-token expired") {
                        toast.error(error.response.data.message);
                        setTimeout(() => {
                            handleLogout();
                        }, 3000);
                    } else {
                        toast.error(error.response.data.message || "Server error occurred. Please try again later.");
                    }
                }
            } else if (error.request) {
                toast.error("No response from server. Please check your connection.");
            } else {
                toast.error("Something went wrong: " + error.message);
            }
        }
    };

    // Cleanup QR code URL when component unmounts
    useEffect(() => {
        return () => {
            if (qrCodeUrl) {
                URL.revokeObjectURL(qrCodeUrl);
            }
        };
    }, [qrCodeUrl]);

    return (
        <>
            {isPageLoading && <Loader />}
            <ToastContainer />
            <div className="mainFlow">
                <Header />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} alt="Logo" />
                        </div>
                        <div className="userFlowAdharVer">
                            <div className="user-profile-dashboard">
                                <SidebarMenu activePage="abha" />
                                <div className="centerBoard">
                                    <div className="rightProfileMain">
                                        <div className="profileBanner">
                                            <img src={ProfleBanner} alt="Profile Banner" />
                                        </div>
                                        <div className="profileUser">
                                            <div className="profileImg">
                                                <img src={profilePhoto || User} alt="Profile" />
                                            </div>
                                            <div className="profileContent">
                                                <h4>{abhaProfile ? abhaProfile.name : ''}</h4>
                                                <p>{abhaProfile ? abhaProfile.preferredAbhaAddress : ''} <CopyText text={abhaProfile?.preferredAbhaAddress} /></p>
                                                <p>{abhaProfile ? abhaProfile.mobile : ''} <CopyText text={abhaProfile?.mobile} /></p>
                                            </div>
                                        </div>
                                        <div className="abhaNumber">
                                            <h4>ABHA Number</h4>
                                            <p>{abhaProfile ? abhaProfile.ABHANumber : ''} <CopyText text={abhaProfile?.ABHANumber} /></p>
                                        </div>
                                        <div className="abhaNumber abhaAddress">
                                            <h4>ABHA Address</h4>
                                            <p>{abhaProfile ? abhaProfile.preferredAbhaAddress : ''} <CopyText text={abhaProfile?.preferredAbhaAddress} /></p>
                                        </div>
                                        <div className="abhaNumber dateOfBirthday">
                                            <div>
                                                <h4>Gender</h4>
                                                <p>{abhaProfile ? (abhaProfile.gender === 'M') ? 'Male' : (abhaProfile.gender === 'F') ? 'Female' : '' : ''}</p>
                                            </div>
                                            <div>
                                                <h4>Date Of Birth</h4>
                                                <p>{abhaProfile ? abhaProfile.dayOfBirth + '-' + abhaProfile.monthOfBirth + '-' + abhaProfile.yearOfBirth : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightDashBord">
                                    <div className="scanner">
                                        <div className="scannerImg">
                                            {qrCodeUrl ? (
                                                <img src={qrCodeUrl} alt="ABHA QR Code" />
                                            ) : (
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bottomDashboard">
                                <div className="saveBtnProfile justify-content-center">
                                    <button
                                        className="custBtn btnThems"
                                        onClick={downloadABHACard}
                                        disabled={loading}
                                    >
                                        <i className="material-icons">download</i>
                                        {loading ? 'Downloading...' : 'Download ABHA Card'}
                                    </button>
                                    <button
                                        className="custBtn btnThems"
                                        onClick={printABHACard}
                                        disabled={loading}
                                    >
                                        <i className="material-icons">print</i>
                                        {loading ? 'Processing...' : 'Print ABHA Card'}
                                    </button>
                                    <button
                                        className="custBtn btnThems"
                                        onClick={downloadAndPrintPVCCard}
                                        disabled={loading}
                                    >
                                        <i className="material-icons">credit_card</i>
                                        {loading ? 'Processing...' : 'Print PVC'}
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

export default UserABHAcard;
