import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../config';
import { createSession, userLogout } from "../../services/apiUtils";
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/common/Loader';

const SidebarMenu = ({ activePage }) => {
    const [isPageLoading, setIsPageLoading] = useState(false);
    const navigate = useNavigate();

    const xTokenLogout = () => {
        userLogout(navigate);
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            setIsPageLoading(true);
            const sessionResponse = await createSession();
            const accessToken = sessionResponse?.accessToken;

            const x_token = localStorage.getItem("x_token");

            if (!accessToken || !x_token) {
                toast.error("You are not logged in. Please log in again.");
                return;
            }

            const response = await axios.get(
                `${API_BASE_URL}/abha/profile/logout`,
                {
                    headers: {
                        "accesstoken": accessToken,
                        "xtoken": x_token,
                        "Content-Type": "application/json",
                        "Accept": "application/json"


                    }
                }
            );
            if (response.status === 200) {
                setIsPageLoading(false);
                xTokenLogout();
            }
        } catch (error) {
			setIsPageLoading(false);
			// Backend returned an error response
			if (error.response.data.success === false && error.response.data.message === "X-token expired") {
				toast.error(error.response.data.message);
				setTimeout(() => {
					xTokenLogout();
				}, 3000);
			} else if (error.response.data.message === "Unclassified Authentication Failure") {
				toast.error(error.response.data.message + ". Please try again!");
			} else {
				toast.error(error.response.data.message || "Server error occurred. Please try again later.");
			}
		} finally {
            setIsPageLoading(false);
        }
    };

    return (
        <>
            {isPageLoading && <Loader />}
            <ToastContainer />
            <div className="leftDashbirdMenu">
                <ul>
                    <li><a className={activePage === "abha" ? "active" : ""} href="/abha-Card">ABHA Card</a></li>
                    <li><a className={activePage === "profile" ? "active" : ""} href="/my-profile">My Profile</a></li>
                    {/* <li><a className={activePage === "manage-profile" ? "active" : ""} href="/manage-ABHA-profile">Manage ABHA Profile</a></li> */}
                    <li><a className={activePage === "password" ? "active" : ""} href="/manage-password">Manage Password</a></li>
                    <li><a className={activePage === "delete" ? "active" : ""} href="/delete-deactivate-account">Delete/Deactivate</a></li>
                    <li><a className={activePage === "re-kyc" ? "active" : ""} href="/re-KYC">Re-KYC</a></li>
                    <li><a href="javaScript:void(0);" onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
        </>

    );
};

export default SidebarMenu;
