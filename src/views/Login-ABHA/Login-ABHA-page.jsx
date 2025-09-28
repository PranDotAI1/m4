import React, { useState, useEffect, useContext } from "react";
import MixLogo from '../../assets/images/home/HealthcareProfessionals.png';
import MobileIcon from '../../assets/images/comman/mobileNumber.png'
import AadharIcon from '../../assets/images/comman/aadharCardIcon.png'
import DrivingLicence from '../../assets/images/comman/drivingLicence.png'
import LoginABHANumber from '../../components/Login-ABHA/LoginABHANumber';
import LoginAadharNumber from '../../components/Login-ABHA/LoginAadharNumer';
import LoginMobileNumber from '../../components/Login-ABHA/LoginMobileNumer';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import Header from "../../components/common/Header";


const LoginABHAPage = () => {
    const navigate = useNavigate();
    const back = () => {
        setLoginType(0);
        navigate('/abha-home');
    }
    const { setDataByKey } = useContext(GlobalContext)
    useEffect(() => {
        setDataByKey('backfunction', back)
    }, []);
    const [loginType, setLoginType] = useState(1);
    /**
     * Function used to set otp text
     */
    const handeLoginType = (e) => {
        const value = Number(e.target.value);
        switch (value) {
            case 1:
                setLoginType(value);
                break;
            case 2:
                setLoginType(value);
                break;
            case 3:
                setLoginType(value);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div className="mainFlow">
                <Header />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} />
                        </div>
                        <div className="userFlowAdharVer anotherPaddingPage">
                            <div className="flowTitle">
                                <h4>Create your Healthcare Professional ID</h4>
                                <p>Create Health care ID via</p>
                            </div>
                            <div className='selectLoginType'>
                                {/* <label for="mobileNumber" className={`selectTypeLogin ${loginType === 1 ? 'active-login' : ''}`}>
                                    <input type='radio' name='loginType' id='mobileNumber' onClick={handeLoginType} value={1} />
                                    <div className='loginTypeSelectOne'>
                                        <img src={MobileIcon} />
                                        <p>Mobile Number</p>
                                    </div>
                                </label> */}
                                <label for="aadharNumber" className={`selectTypeLogin ${loginType === 1 ? 'active-login' : ''}`}>
                                    <input type='radio' name='loginType' id='aadharNumber' onClick={handeLoginType} value={1} />
                                    <div className='loginTypeSelectOne'>
                                        <img src={AadharIcon} />
                                        <p>Aadhar Number</p>
                                    </div>
                                </label>
                                <label for="abhaNumber" className={`selectTypeLogin ${loginType === 2 ? 'active-login' : ''}`}>
                                    <input type='radio' name='loginType' id='abhaNumber' onClick={handeLoginType} value={2} />
                                    <div className='loginTypeSelectOne'>
                                        <img src={DrivingLicence} />
                                        <p>Driving Licence</p>
                                    </div>
                                </label>
                            </div>
                            {/* {loginType == 1 && (
                                <LoginMobileNumber />
                            )} */}
                            {loginType == 1 && (
                                <LoginAadharNumber />
                            )}
                            {loginType == 2 && (
                                <LoginABHANumber />
                            )}
                            <div className='loginPageFooter'>
                                <div className='forgotAbhaRetrive'>
                                    <p>Already have an account? <Link to={'/forgoat-ABHA'}>Login Here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginABHAPage;