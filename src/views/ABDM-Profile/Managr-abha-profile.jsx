import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import MixLogo from '../../assets/images/logo-mix.svg'
import User from '../../assets/images/comman/user-1.png'
import user2 from '../../assets/images/comman/user-2.png'


const ManageABHAProfile = () => {
    const [abhaAccounts, setAbhaAccounts] = useState([]);
    useEffect(() => {
        const storedProfileData = localStorage.getItem("abhaProfileData");
        if (storedProfileData) {
            setAbhaAccounts(JSON.parse(storedProfileData));
        }
    }, [localStorage.getItem("abhaProfileData")]);

    useEffect(() => {
        console.log('Updated abhaAccounts:', abhaAccounts);
    }, [abhaAccounts]);

    return (
        <>
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
                                        <li><a href="/my-profile">My Profile</a></li>
                                        <li><a className="active" href="/manage-ABHA-profile">Manage ABHA Profile</a></li>
                                        <li><a href="/manage-password">Manage Password</a></li>
                                        <li><a href="/delete-deactivate-account">Delete/Deactivate</a></li>
                                        <li><a href="/re-KYC">Re-KYC</a></li>
                                        <li><a href="/login-ABHA">Logout</a></li>
                                    </ul>
                                </div> */}
                                <div className="centerBoard manageAbhaProfile">
                                    <div className="rightProfileMain">
                                        <div className="manageProfileSection">
                                            {abhaAccounts?.accounts?.length > 0 && abhaAccounts.accounts.map((account, index) => (
                                                <div className="manageProfileBox" key={index}>
                                                    <div className="manageProfilePhoto">
                                                        <img src={`data:image/jpeg;base64,${account.profilePhoto}`} alt={account.name} />
                                                    </div>
                                                    <div className="manageProfileContent">
                                                        <div className="userName">
                                                            <h4>{account.name}</h4>
                                                            <p>{account.preferredAbhaAddress}</p>
                                                        </div>
                                                        <div className="userAbhaNumber">
                                                            <h4>ABHA Number</h4>
                                                            <p>{account.ABHANumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="selectProfile">
                                                        <button className="custBtn btnThems w-100">Select Profile</button>
                                                    </div>
                                                </div>
                                            ))}


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageABHAProfile;