import React, { useState, useEffect, useContext } from "react";
import MixLogo from '../../assets/images/home/HealthcareProfessionals.png';
import MobileIcon from '../../assets/images/comman/mobileNumber.png'
import PHRID from '../../assets/images/comman/phr-id.png'
import MobileNHPR from '../../assets/images/comman/mobileNHPR.png'
import LoginABHANumber from '../../components/Login-ABHA/LoginABHANumber';
import LoginAadharNumber from '../../components/Login-ABHA/LoginAadharNumer';
import LoginMobileNumber from '../../components/Login-ABHA/LoginMobileNumer';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalDataContext/GlobalContext";
import Header from "../../components/common/Header";
import LoginPHRID from "../../components/Login-NHPR/Login-phr-id";
import LoginNHPRMobileNumber from "../../components/Login-NHPR/LoginNPHR-MobileNo";


const LoginNHPRPage = () => {
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
                                <h4>Login to National Healthcare Providers Registry</h4>
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
                                        <img src={PHRID} />
                                        <p>PHR ID/Username</p>
                                    </div>
                                </label>
                                <label for="abhaNumber" className={`selectTypeLogin ${loginType === 2 ? 'active-login' : ''}`}>
                                    <input type='radio' name='loginType' id='abhaNumber' onClick={handeLoginType} value={2} />
                                    <div className='loginTypeSelectOne'>
                                        <img src={MobileNHPR} />
                                        <p>Mobile Number</p>
                                    </div>
                                </label>
                            </div>
                            {/* {loginType == 1 && (
                                <LoginMobileNumber />
                            )} */}
                            {loginType == 1 && (
                                <LoginPHRID />
                            )}
                            {loginType == 2 && (
                                <LoginNHPRMobileNumber />
                            )}
                            <div className='loginPageFooter'>
                                <div className='forgotAbhaRetrive'>
                                    <p>Do not have an account?  <Link to={'/forgoat-ABHA'}>Register Here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginNHPRPage;