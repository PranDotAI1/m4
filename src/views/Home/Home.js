import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhiteLogo from "../../assets/images/white-logo.svg";
import Logo from "../../assets/images/logo.svg";
import BannerImg from "../../assets/images/comman/banner-Img.png";
import Video from "../../assets/images/comman/video.png";
import ComplianceSupport from "../../assets/images/home/Compliance-Support.png";
import Transparency from "../../assets/images/home/Transparency.png";
import Interoperability from "../../assets/images/home/Interoperability.png";
import ScalabilityPerformance from "../../assets/images/home/Scalability-Performance.png";

import Patients from "../../assets/images/home/Patients.png";
import CareProviders from "../../assets/images/home/CareProviders.png";
import HealthcareFacilities from "../../assets/images/home/HealthcareFacilities.png";
import InsuranceProviders from "../../assets/images/home/InsuranceProviders.png";


import Maternal from "../../assets/images/home/Maternal.png";
import Nutrition from "../../assets/images/home/Nutrition.png";
import Health from "../../assets/images/home/Health.png";
import Disease from "../../assets/images/home/Disease.png";
import Policy from "../../assets/images/home/Policy.png";
import Community from "../../assets/images/home/Community.png";

import Mission from '../../assets/images/home/image-168.png';
import MissionCircle from '../../assets/images/home/vectors-wrapper-1.svg'

import WhiteLogo2 from '../../assets/images/white-logo-2.svg'
import BotLogo from '../../assets/images/comman/bot.svg';

import GovtDashboard from '../../assets/images/home/GovtDashboard.png';
import Hospital from '../../assets/images/home/HospitalAdmin.png';
import ABHAImg from '../../assets/images/home/ABHA.png';
import PatientApp from '../../assets/images/home/PatientsApp.png';
import CollegePortal from '../../assets/images/home/CollegePortal.png';
import CommingSoon from '../../assets/images/home/commingSoon.png';


import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import Loader from "../../components/common/Loader";




const Home = () => {



    // const navigate = useNavigate();

    // const handliGoCreateABHAid = () => {
    //     navigate('/abha-home')
    // }

    const [showVideoHome, setShowVideoHome] = useState(false);
    const handleClickPlayVideoHome = () => {
        setShowVideoHome(true);
    };



    return (
        <>
            <header className="headerMain">
                <div className="container">
                    <div className="header">
                        <div className="logo-section">
                            <img src={Logo} />
                        </div>
                        <div className="menuSection">
                            <ul>
                                <li><a href="#">Why Pran AI</a></li>
                                <li><a href="#">Products</a>
                                    <ul className="firstDropDownMenu">
                                        <li><a href="">Govt Dashboard</a></li>
                                        <li><a href="">Hospital Admin</a></li>
                                        <li><a href="">ABHA</a></li>
                                        <li><a href="">Patients App</a></li>
                                        <li><a href="https://www.campus.pran.ai/">College Portal</a></li>
                                        <li><a href="">PHR<span className="comSoon">Coming Soon</span></a></li>
                                        <li><a href="">HMIS<span className="comSoon">Coming Soon</span></a></li>
                                        <li><a href="">LIMS<span className="comSoon">Coming Soon</span></a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Platform</a></li>
                                <li><a href="#">Resource </a></li>
                                <li><a href="#">Partnerships </a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <div className="bannerSection">
                <div className="container">
                    <div className="bigData">
                        <h4>Big Data Science <br />
                            & Analytics</h4>
                        <p>With Pran AI’s Health 360 Data Intelligent Automation Platform</p>
                        <div className="centerImg">
                            <img src={BannerImg} />
                        </div>
                        <div className="portalList">
                            <div className="prortalBox">
                                <Link>
                                    <h5>Govt Dashboard</h5>
                                    <div className="portalImg">
                                        <img src={GovtDashboard} />
                                    </div>
                                </Link>
                            </div>
                            <div className="prortalBox">
                                <Link>
                                    <h5>Hospital Admin</h5>
                                    <div className="portalImg">
                                        <img src={Hospital} />
                                    </div>
                                </Link>
                            </div>
                            <div className="prortalBox">
                                <Link to={"/abha-home"}>
                                    <h5>ABHA</h5>
                                    <div className="portalImg">
                                        <img src={ABHAImg} />
                                    </div>
                                </Link>
                            </div>
                            <div className="prortalBox">
                                <Link>
                                    <h5>Patients App</h5>
                                    <div className="portalImg">
                                        <img src={PatientApp} />
                                    </div>
                                </Link>
                            </div>
                            <div className="prortalBox">
                                <a
                                    href="https://www.campus.pran.ai/"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <h5>College Portal</h5>
                                    <div className="portalImg">
                                        <img src={CollegePortal} style={{ cursor: 'pointer' }} />
                                    </div>
                                </a>
                            </div>
                            <div className="prortalBox">
                                <Link>
                                    <h5>PHR</h5>
                                    <div className="portalImg">
                                        <img src={CommingSoon} />
                                    </div>
                                </Link>
                            </div>
                            <div className="prortalBox">
                                <Link>
                                    <h5>HMIS</h5>
                                    <div className="portalImg">
                                        <img src={CommingSoon} />
                                    </div>
                                </Link>
                            </div>
                            <div className="prortalBox">
                                <Link>
                                    <h5>LIMS</h5>
                                    <div className="portalImg">
                                        <img src={CommingSoon} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="stretgy-story">
                <div className="container">
                    <div className="vidSection">
                        <h4>Our Most Recent Data nalytics Strategy Story</h4>
                        <div className="videoSec">
                            {!showVideoHome ? <img src={Video} onClick={handleClickPlayVideoHome} />
                                :
                                <iframe src="https://www.youtube.com/embed/uKHyw78oOUk?autoplay=1" title="Pran AI Hindi" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                            }
                        </div>
                    </div>
                    <div className="video-bottom-content">
                        <div className="video-left">
                            <h5>Healthcare Gaps and Powered <span>Pran.AI to transform HealthCare</span></h5>
                            <p>Impact & Services of Pran.AI in HealthCare</p>
                        </div>
                        <div className="video-right">
                            <div className="content-video">
                                <h4>Infant Mortality
                                    Rate of<span> 35/1000
                                        vs other state of
                                        8/1000</span></h4>
                            </div>
                            <div className="content-video">
                                <h4><span>80% </span>of Healthcare
                                    data siloed &
                                    unstructured</h4>
                            </div>
                            <div className="content-video">
                                <h4>Limited awareness
                                    & lack of trust in <span>Digital Health</span></h4>
                            </div>
                            <div className="content-video">
                                <h4><span>40% </span>Children
                                    under 5
                                    malnutrition</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="greenBgNotes">
                <div className="container">
                    <div className="contentSection">
                        <p>Pran AI helps to fill the  Health Care Gaps to <br />Transforms Urban and Rural Life </p>
                    </div>
                </div>
            </div>

            <div className="services-boxes">
                <div className="container">
                    <div className="servicesColumRow">
                        <div className="servicesColum">
                            <div className="servicesColumImg">
                                <img src={ComplianceSupport} />
                            </div>
                            <div className="servicesColumContent">
                                <h4>Compliance & Support and <br />
                                    Training Transparency Privacy</h4>
                                <p>• India’s Data Protection Bill (2022)</p>
                                <p>• Telemedicine Practice guidelines (2020) </p>
                                <p>• HIPPA • End-to-End Encryption </p>
                                <p>• Role-Based Access Control </p>
                                <p>• Secure Data Storage</p>
                                <p>• Continuous Monitoring</p>
                            </div>
                        </div>
                        <div className="servicesColum">
                            <div className="servicesColumImg">
                                <img src={Transparency} />
                            </div>
                            <div className="servicesColumContent">
                                <h4>Transparency</h4>
                                <p>• Diverse Datasets validation</p>
                                <p>• Bias Mitigation</p>
                                <p>• Periodic audits and feedback loops</p>
                            </div>
                        </div>
                        <div className="servicesColum">
                            <div className="servicesColumImg">
                                <img src={Interoperability} />
                            </div>
                            <div className="servicesColumContent">
                                <h4>Interoperability</h4>
                                <p>• Ayushman Bharat Digital Mission
                                    (ABDM)</p>
                                <p>•  Electronic Health
                                    Record (EHR)</p>
                                <p>• AI-Driven Data Standardization</p>
                                <p>• Enhanced Accessibility</p>
                            </div>
                        </div>
                        <div className="servicesColum">
                            <div className="servicesColumImg">
                                <img src={ScalabilityPerformance} />
                            </div>
                            <div className="servicesColumContent">
                                <h4>Scalability &
                                    Performance </h4>
                                <p>• Dynamic Scalability</p>
                                <p>• AI-Optimized performance</p>
                                <p>• Offline Functionality</p>
                                <p>• Rural Accessibility</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="greenBgNotes">
                <div className="container">
                    <div className="contentSection">
                        <p>Pran AI helps to fill the  Health Care Gaps to <br />Transforms Urban and Rural Life </p>
                    </div>
                </div>
            </div>


            <div className="featuresSection">
                <div className="featuresRow">
                    <div className="feautresColum">
                        <div className="innerColumFeatures">
                            <h4>Patients</h4>
                            <img src={Patients} />
                        </div>
                    </div>
                    <div className="feautresColum">
                        <div className="innerColumFeatures">
                            <h4>Care Providers</h4>
                            <img src={CareProviders} />
                        </div>
                    </div>
                    <div className="feautresColum">
                        <div className="innerColumFeatures">
                            <h4>Healthcare Facilities</h4>
                            <img src={HealthcareFacilities} />
                        </div>
                    </div>
                    <div className="feautresColum">
                        <div className="innerColumFeatures">
                            <h4>Insurance Providers</h4>
                            <img src={InsuranceProviders} />
                        </div>
                    </div>
                </div>
            </div>



            <div className="aminitesSection">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-4">
                            <div className="aminitesColum">
                                <div className="amiImgIcon">
                                    <img src={Maternal} />
                                </div>
                                <div className="amiImgContent">
                                    <h4>Maternal & Child Health<br />
                                        Dashboard</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="aminitesColum">
                                <div className="amiImgIcon">
                                    <img src={Nutrition} />
                                </div>
                                <div className="amiImgContent">
                                    <h4>Nutrition & Malnutrition<br />
                                        Monitoring system</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="aminitesColum">
                                <div className="amiImgIcon">
                                    <img src={Health} />
                                </div>
                                <div className="amiImgContent">
                                    <h4>Health Resource<br />
                                        Allocation Tool</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="aminitesColum">
                                <div className="amiImgIcon">
                                    <img src={Disease} />
                                </div>
                                <div className="amiImgContent">
                                    <h4>Disease<br />
                                        Surveillance Tool</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="aminitesColum">
                                <div className="amiImgIcon">
                                    <img src={Policy} />
                                </div>
                                <div className="amiImgContent">
                                    <h4>Policy and<br />
                                        Governance Dashboard</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="aminitesColum">
                                <div className="amiImgIcon">
                                    <img src={Community} />
                                </div>
                                <div className="amiImgContent">
                                    <h4>Community
                                        Health <br />Workers Dashboard</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="greenBgNotes">
                <div className="container">
                    <div className="contentSection">
                        <p>Pran AI government dashboard Integration</p>
                    </div>
                </div>
            </div>


            <div className="digitalMission">
                <div className="container">
                    <div className="digitalMissionImage">
                        <div className="missionImg">
                            <img src={Mission} />
                        </div>
                        <div className="missionImgCircle">
                            <img src={MissionCircle} />
                        </div>
                    </div>
                </div>
            </div>


            <div className="footer">
                <div className="container">
                    <div className="footer-row">
                        <div className="footer-col">
                            <div className="whiteLogo">
                                <img src={WhiteLogo2} />
                            </div>
                            <p>A 4th Floor JMD Regent Towers,
                                MG Road, Gurugram</p>
                        </div>
                        <div className="footer-col">
                            <h4>quick link</h4>
                            <ul>
                                <li><a href="">Platform</a></li>
                                <li><a href="">Resource</a></li>
                                <li><a href="">Partnerships</a></li>
                                <li><a href="">Team</a></li>
                                <li><a href="">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bottomFooter">
                        <p>© Copyright 2024. Pran AI, Inc. All rights reserved. </p>
                    </div>
                </div>
            </div>


            <div className="botIcon">
                <a href="https://chatbot.pran.ai/" target="_blank">
                    <img src={BotLogo} />
                </a>
            </div>

        </>
    )
}

export default Home;