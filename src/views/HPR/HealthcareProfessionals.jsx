import HPRStepper from "./HPR-Stepper";
import WhiteLogo from '../../assets/images/white-logo-2.svg'
import HospitalIcon from '../../assets/images/comman/hospital.svg'
import QuestionSquare from '../../assets/images/comman/question-square.svg'
import User from '../../assets/images/comman/user-1.png'
import BasicInfo from "../../components/HPR/BasicInfo";

const HealthcareProfessionals = () => {
    return (
        <>
            <div className="HealthcareProfessionalsPage">
                <div className="container">
                    <div className="steparHeader">
                        <div className="headerLogoSteper">
                            <img src={WhiteLogo} />
                        </div>
                        <div className="headerLogoSteperAside">
                            <ul>
                                <li>
                                    <div className="headerFacility">
                                        <div className="icon"><img src={HospitalIcon} /></div>
                                        <div className="value">Health Facility Registry</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="headerFacility">
                                        <div className="icon"><img src={QuestionSquare} /></div>
                                        <div className="value">Raise Request</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="profileStepar">
                                        Rahul Sharma
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="stepearBody">
                        <div className="profileSeaction">
                            <div className="profileRow">
                                <div className="profileRowCol userName userPics">
                                    <img src={User} className="profileImgUser" />
                                    <div className="userRightDet">
                                        <h4>Rahul Sharma</h4>
                                        <p>9876543210</p>
                                    </div>
                                </div>
                                <div className="profileRowCol userAddress">
                                    <div className="title">Address </div>
                                    <div className="value">8J26+FPH, 3271A, TK Layout, Mysuru, Karnataka 570009  </div>
                                </div>
                                <div className="profileRowCol gendarDobMix">
                                    <div className="userGender">
                                        <div className="title">Gender</div>
                                        <div className="value">Male</div>
                                    </div>
                                    <div className="userDOB">
                                        <div className="title">Date Of Birth</div>
                                        <div className="value">31 / 12/ 2000</div>
                                    </div>
                                </div>

                            </div>
                            <div className="profileRow">
                                <div className="profileRowCol userHpid">
                                    <div className="title">HPID: </div>
                                    <div className="value">71-3**********3883 </div>
                                </div>
                                <div className="profileRowCol userApplicantStatus ">
                                    <div className="title">Application Status</div>
                                    <div className="value">Draft</div>
                                </div>

                                <div className="profileRowCol userWorkStatus">
                                    <div className="title">Work Status</div>
                                    <div className="value">Draft</div>
                                </div>
                            </div>
                            <div className="profileRow">
                                <div className="profileRowCol counsilStatusMix">
                                    <div className="userCounsilStatus">
                                        <div className="title">Council Status</div>
                                        <div className="value">Draft</div>
                                    </div>
                                    <div className=" userCounsilStatus">
                                        <div className="title">Council Status</div>
                                        <div className="value">Draft</div>
                                    </div>
                                </div>

                                <div className="profileRowCol userRole">
                                    <div className="title">Role</div>
                                    <div className="value">Health Professional</div>
                                </div>
                                <div className="profileRowCol userEmail">
                                    <div className="title">Email:</div>
                                    <div className="value">email@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        {/* <BasicInfo /> */}
                        <HPRStepper />
                    </div>

                </div>
            </div>
        </>
    )
}
export default HealthcareProfessionals;