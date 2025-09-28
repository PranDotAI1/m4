import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import MixLogo from "../../assets/images/home/multipleLogo.png";
import Citizens from "../../assets/images/home/citizen.png";
import HealthcareProfessionals from "../../assets/images/home/HealthcareProfessionals.png";
import HealthFacility from "../../assets/images/home/HealthFacility.png";

import persnal from "../../assets/images/comman/persnal-health-records.png";
import constent from "../../assets/images/comman/constent-access.png";
import digital from "../../assets/images/comman/digital-health-records.png";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import VerificationModel from "../../components/Abha-home/Verification-Type-model";
import DeactivatePopup from "../../components/Forgot-ABHA/Account-deactivate-popup";


const AbhaAbout = () => {

    const [adharNo, setAdharNo] = useState("695968714526");
    const [showModal, setShowModal] = useState(false);


    const navigate = useNavigate();

    const handlCancelABHAaddress = () => {
        navigate('/home')
    }

    const { setDataByKey } = useContext(GlobalContext)
    useEffect(() => {
        setDataByKey('AdharCardNumber', adharNo)
    }, []);

    const handleCreateABHA = () => {
        setShowModal(true);
    };

    const loginToAbha = () => {
        navigate('/login-ABHA');
    }

    const handleContinue = (selectedType) => {
        if (selectedType === 'aadhaar') {
            navigate('/aadhar-abha-create');
        } else if (selectedType === 'dl') {
            navigate('/dl-abha-create');
        }
    };


    const [clicktab, setClickTab] = useState('Citizens')
    const handleTabs = (evt) => {
        setClickTab(evt)
    }


    return (
        <>
            {/* <DeactivatePopup /> */}
            <div className="mainFlow">
                <Header />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="pranAbhaHealthContent">
                            <div className="abha-paranLogo-abhaHome">
                                <img src={MixLogo} />
                            </div>

                            <h5>ABHA - Ayushman Bharat Health Account - Key to your digital healthcare journey.</h5>
                            {/* <h6>Why create ABHA?</h6> */}
                            {/* <p>ABHA number will establish a strong and trustable identity for you that will be accepted by healthcare providers across the country. Seamless sign up for PHR (Personal Health Records) applications such as ABDM ABHA application for Health data sharing.</p> */}
                            <h4>Login / Register</h4>
                        </div>
                        <div className="pranAiBoxes">
                            <div className={`row threeTabsColum ${clicktab === "Citizens"
                                ? "activeCitizen"
                                : clicktab === "Healthcare Professionals"
                                    ? "activeHealthcareProfessionals"
                                    : clicktab === "Health Facility"
                                        ? "activeHealthFacility"
                                        : ""
                                }`}>
                                <div className="col-xs-12 col-md-4">
                                    <div className="pranBoxesTab Citizens" onClick={() => handleTabs('Citizens')}>
                                        <div className="pranBoxedImg">
                                            <img src={Citizens} />
                                        </div>
                                        <h4>Citizens </h4>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <div className="pranBoxesTab HealthcareProfessionals" onClick={() => handleTabs('Healthcare Professionals')}>
                                        <div className="pranBoxedImg">
                                            <img src={HealthcareProfessionals} />
                                        </div>
                                        <h4>Healthcare Professionals</h4>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-4">
                                    <div className="pranBoxesTab HealthFacility" onClick={() => handleTabs('Health Facility')}>
                                        <div className="pranBoxedImg">
                                            <img src={HealthFacility} />
                                        </div>
                                        <h4>Health Facility</h4>
                                    </div>
                                </div>
                            </div>


                            <div className={`pranAiBoxesDetails ${clicktab === "Citizens"
                                ? "CitizensDetails"
                                : clicktab === "Healthcare Professionals"
                                    ? "HealthcareProfessionals"
                                    : clicktab === "Health Facility"
                                        ? "HealthFacility"
                                        : ""
                                }`}>
                                {clicktab === 'Citizens' &&
                                    <>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={persnal} />
                                                    </div>
                                                    <h4>Personal Health Records</h4>
                                                </div>

                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={constent} />
                                                    </div>
                                                    <h4>Consent Access</h4>
                                                </div>

                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={digital} />
                                                    </div>
                                                    <h4>Digital Health Record</h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxDet">
                                                    <p>Link all healthcare benefits ranging from public health programmes to insurance schemes to your unique ABHA number</p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxDet">
                                                    <p>Avoid long lines for registration in healthcare facilities across the country</p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxDet">
                                                    <p>Seamless sign up for PHR (Personal Health Records) applications such as ABDM application for health data sharing</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {clicktab === 'Healthcare Professionals' &&
                                    <>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={persnal} />
                                                    </div>
                                                    <h4>Trustable Identity </h4>
                                                </div>

                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={constent} />
                                                    </div>
                                                    <h4>Online Presence and Discoverability </h4>
                                                </div>

                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={digital} />
                                                    </div>
                                                    <h4>Tele-Consultation</h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-8">
                                                <div className="pranBoxDet">
                                                    <p>Doctors from all the system of medicines (Modern medicine, Dentist, Ayurveda, Unani, Siddha, Sowa-Rigpa, Homeopathy) and Nurses can be part of the Healthcare Professional Registry (HPR). The HPR is envisaged to evolve into a citizen-centric and practitioner-centric platform in compliance with global healthcare standards. </p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxDet">
                                                    <p>Facility Managers of hospitals, clinics, diagnostic laboratories and imaging centres, pharmacies, blood banks, etc. of both government and private sector.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {clicktab === 'Health Facility' &&
                                    <>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={persnal} />
                                                    </div>
                                                    <h4>Trustable Identity </h4>
                                                </div>

                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={constent} />
                                                    </div>
                                                    <h4>Unified Digital Services</h4>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxes">
                                                    <div className="pranBoxedImg">
                                                        <img src={digital} />
                                                    </div>
                                                    <h4>Tele-Consultation</h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-md-8">
                                                <div className="pranBoxDet">
                                                    <p>Doctors from all the system of medicines (Modern medicine, Dentist, Ayurveda, Unani, Siddha, Sowa-Rigpa, Homeopathy) and Nurses can be part of the Healthcare Professional Registry (HPR). The HPR is envisaged to evolve into a citizen-centric and practitioner-centric platform in compliance with global healthcare standards. </p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-4">
                                                <div className="pranBoxDet">
                                                    <p>Facility Managers of hospitals, clinics, diagnostic laboratories and imaging centres, pharmacies, blood banks, etc. of both government and private sector.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }

                                <div className="createAbhaBtn">
                                    <button className="custBtn btnCancel" onClick={handlCancelABHAaddress}>Back to Pran .AI</button>
                                    <button className="custBtn btnSuccess" onClick={handleCreateABHA}>Create  ABHA Address <i className="material-icons">arrow_right_alt</i></button>
                                    <button className="custBtn btnThems" onClick={loginToAbha}>Login to ABHA <i className="material-icons">arrow_right_alt</i></button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="loginPageFooter">
                            <div className="forgotAbhaRetrive">
                                <p><a href="/forgoat-ABHA">Forgot ABHA number?</a></p>
                                <p><a href="/re-activate">Reactivate ABHA</a></p>
                                <p><a href="/retrieve-enrollment">Retrieve your Enrollment number</a></p>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>

            {showModal && (
                <VerificationModel onClose={() => setShowModal(false)} onContinue={handleContinue} />)
            }

        </>
    )
}
export default AbhaAbout;