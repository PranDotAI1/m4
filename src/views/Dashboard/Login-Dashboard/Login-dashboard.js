import React, { useContext, useEffect, useState, useRef } from "react";
import Header from "../../../components/common/Header";
import MixLogo from "../../../assets/images/logo-mix.svg";
import { ToastContainer, toast } from "react-toastify";




const LoginDashboard = () => {




    return (
        <>
            <div className="mainFlow">
                <Header />
                <ToastContainer />
                <div className="container">
                    <div className="pranHealtnMainUserFlow">
                        <div className="abha-paranLogo">
                            <img src={MixLogo} />
                        </div>
                        <div className="userFlowAdharVer loginToDashboard">
                            <div className="flowTitle">
                                <h4>Login To Dashboard</h4>
                            </div>
                            <div className="flow-feilds">
                                <div className="feilds">
                                    <label>User Name</label>
                                    <input type="text" className="filds-form" placeholder="Enter Aadhar" name="adharno"
                                        maxLength="14" autoComplete='off' />
                                </div>
                                <div className="feilds">
                                    <label>Password</label>
                                    <input type="text" className="filds-form" placeholder="Enter OTP" maxLength={6} />
                                </div>

                                <div className="feilds mt-3">
                                    <button className="custBtn btnThems w-100">Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginDashboard;