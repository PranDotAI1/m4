import React, { useState } from "react";
import WhiteLogo from "../../assets/images/white-logo.svg";
import Logo from "../../assets/images/logo.svg";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

import GovtDashboard from '../../assets/images/home/GovtDashboard.png';
import Hospital from '../../assets/images/home/HospitalAdmin.png';
import ABHAImg from '../../assets/images/home/ABHA.png';
import PatientApp from '../../assets/images/home/PatientsApp.png';
import CollegePortal from '../../assets/images/home/CollegePortal.png';
import Poster from '../../assets/images/home/poster.png';
import Play from '../../assets/images/home/play.png';


const Login = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);


    const handleLogin = async () => {
        setError("");
        // All fields required check
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }
        setLoader(true);
        try {
            const response = await fetch("https://ajilecampus.pran.ai/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe: rememberMe ? "true" : "false"
                })
            });
            const data = await response.json();
            if (data.success && data.data && data.data.token) {
                localStorage.setItem("jwtTokenbycampus", data.data.token);
                setLoader(false);
                navigate("/home");
            } else {
                setLoader(false);
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setLoader(false);
            setError("Network error. Please try again.");
        }
    };


    const handleClickPlayVideo = () => {
        setShowVideo(true);
    };


    return (
        <>
            {loader && <Loader />}

            <div className="login-page">
                <div className="left-section">
                    <div className="custome-coursole">
                        <div className="portalImgRow">
                            <div className="portalImgCol">
                                <div className="imgSec">
                                    <img src={GovtDashboard} />
                                </div>
                                <p>Govt Dashboard</p>
                            </div>
                            <div className="portalImgCol">
                                <div className="imgSec">
                                    <img src={Hospital} />
                                </div>
                                <p>Hospital Admin</p>
                            </div>
                            <div className="portalImgCol">
                                <div className="imgSec">
                                    <img src={ABHAImg} />
                                </div>
                                <p>ABHA</p>
                            </div>
                            <div className="portalImgCol">
                                <div className="imgSec">
                                    <img src={PatientApp} />
                                </div>
                                <p>Patients App</p>
                            </div>
                            <div className="portalImgCol">
                                <div className="imgSec">
                                    <a
                                        href="https://www.campus.pran.ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <img src={CollegePortal} style={{ cursor: 'pointer' }} onClick={e => e.stopPropagation()} />
                                    </a>
                                </div>
                                <p>
                                    <a
                                        href="https://www.campus.pran.ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        College Portal
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="dataanalyticsStrategy">
                            <h4>Data analytics Strategy</h4>
                            <div className="dataAnaSteVideo">
                                {!showVideo ? <img src={Poster} onClick={handleClickPlayVideo} />
                                    :
                                    <iframe src="https://www.youtube.com/embed/uKHyw78oOUk?autoplay=1" title="Pran AI Hindi" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                                }
                                {!showVideo && <div className="play">
                                    <img src={Play} />
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="white-logo">
                        <img src={WhiteLogo} alt="Logo" />
                    </div>
                </div>
                <div className="right-section">
                    <div className="logo-section-login">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="login-section">
                        <h4>Login into your account</h4>
                        <div className="loginFeilds">
                            <div className="feilds">
                                <label>Email</label>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="feilds">
                                <label>Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="feilds remember-forgot">
                                <div className="rememberMe form-check checkBoxCustomeSection">
                                    <label className="checkBoxCustome">Remember me
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={e => setRememberMe(e.target.checked)}
                                        />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="forgot-text">
                                    Forgot Password?
                                </div>
                            </div>
                            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
                            <div className="feilds">
                                <button className="customeBtn successBtn w-100 px-3 py-2" onClick={handleLogin} disabled={loader}>
                                    {loader ? "Logging in..." : "Log in"}
                                </button>
                            </div>
                            <div className="dontHaveAccRequestAdmin">
                                <p>Don't have account?</p>
                                <div className="requestAdmin">Request to Admin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;