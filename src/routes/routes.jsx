import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../views/Home/Home"
import AbhaAbout from "../views/Abha-home/UserFlow"
import AadharUserFlow from "../views/Create-ABHA/AadharVerification"
import UserProfileABDM from "../views/ABDM-Profile/ABDM-profile"
import UserABHAcard from "../views/ABDM-Profile/ABHA-Card"
import AadharVerification from "../views/Create-ABHA/AadharVerification"
import DLverification from "../views/Create-ABHA/DL-Verification"
import AadharVerificationPage from "../views/Create-ABHA/AadharVerification"
import DLverificationPage from "../views/Create-ABHA/DL-Verification"
import ManageABHAProfile from "../views/ABDM-Profile/Managr-abha-profile"
import ManagePassword from "../views/ABDM-Profile/Manage-Password"
import DeleteDeactivateAccount from "../views/ABDM-Profile/Delete-Deactivate-account"
import LoginABHAPage from "../views/Login-ABHA/Login-ABHA-page"
import ForgotABHAPage from "../views/Forgot-ABHA/Forgot-ABHA"
import ReKYC from "../views/ABDM-Profile/Re-KYC"
import LoginDashboard from "../views/Dashboard/Login-Dashboard/Login-dashboard"
import Consents from "../views/Dashboard/Consents/Consents"
import DLabhaRegistration from "../views/Create-ABHA/Dl-Abha-Create"
import ReactivateABHA from "../views/Reactivate-ABHA/Reactivate-ABHA"
import RetrieveEnrollment from "../views/Retrieve-Enrollment/Retrieve-Enrollment"
import Login from "../views/Home/Login"
import { ProtectedRoute, ProtectedRoutesbyCampus } from "../components/common/ProtectedRoute";
import LoginNHPRPage from "../views/NHPR-login/NHPR-Login"



const WebRoutes = () => {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/abha-home" element={<AbhaAbout />}></Route>
                    <Route path="/login-NHPR" element={<LoginNHPRPage />}></Route>
                    <Route path="/aadhar-abha-create" element={<AadharVerificationPage />}></Route>
                    <Route path="/abha-Card" element={<UserABHAcard />} />
                    <Route path="/my-profile" element={<UserProfileABDM />} />
                    <Route path="/manage-ABHA-profile" element={<ManageABHAProfile />} />
                    <Route path="/manage-password" element={<ManagePassword />} />
                    <Route path="/delete-deactivate-account" element={<DeleteDeactivateAccount />} />
                    <Route path="/re-KYC" element={<ReKYC />} />
                    <Route path="/login-ABHA" element={<LoginABHAPage />}></Route>
                    <Route path="/forgoat-ABHA" element={<ForgotABHAPage />}></Route>
                    <Route path="/retrieve-enrollment" element={<RetrieveEnrollment />}></Route>
                    <Route path="/re-activate" element={<ReactivateABHA />}></Route>
                    <Route path="/dashboard-login" element={<LoginDashboard />}></Route>
                    <Route path="/consents" element={<Consents />} />
                    <Route path="/dl-abha-create" element={<DLabhaRegistration />}></Route>
                    <Route path="/" element={<Login />}></Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default WebRoutes;