import Header from "../../components/common/Header";
import MixLogo from '../../assets/images/logo-mix.svg';
import Deactivate1 from '../../assets/images/comman/deactivate1.png';
import Deactivate2 from '../../assets/images/comman/deactivate2.png';
import Deactivate3 from '../../assets/images/comman/deactivate3.png';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import Loader from '../../components/common/Loader';
import { useNavigate } from "react-router-dom";
import { encryptString, createSession, userLogout } from "../../services/apiUtils";
import SidebarMenu from "../../components/Abha-home/ABHA-SidebarMenu";
import DeActivateVeryfyOTP from "../../components/Create-ABHA/deactivate-veryfyOtp";
import { useState } from "react";

const DeleteDeactivateAccount = () => {
	const [isPageLoading, setIsPageLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [txnId, setTxnId] = useState('');
	const [otp, setOtp] = useState('');
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	const handleLogout = () => {
		userLogout(navigate);
	};

	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
	};

	const handleOtpChange = (e) => {
		const value = e.target.value;
		if (/^\d{0,6}$/.test(value)) {
			setOtp(value);
		}
	};

	const sendOTP = async () => {
		if (!selectedOption) {
			toast.error("Please select an option first");
			return;
		}

		setIsPageLoading(true);

		try {
			const sessionResponse = await createSession();
			const token = sessionResponse?.accessToken;
			const xToken = localStorage.getItem("x_token");

			if (!token || !xToken) {
				setIsPageLoading(false);
				toast.error("Session expired. Please login again");
				return;
			}

			const abhaNumber = JSON.parse(localStorage.getItem("orignalBeneficiaryData"))?.ABHANumber;

			if (!abhaNumber) {
				setIsPageLoading(false);
				toast.error("ABHA number not found");
				return;
			}

			const encryptedAbhaNumber = await encryptString(abhaNumber);

			const endpoint = selectedOption === 'de-activate'
				? '/abha/account/de-activate/send-otp'
				: '/abha/account/delete/send-otp';

			const headers = {
				'accesstoken': `${token}`,
				'xtoken': xToken
			};

			const payload = {
				loginId: encryptedAbhaNumber
			};

			const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, { headers });
			const dtResponse = response.data;
			if (dtResponse.success) {
				setIsPageLoading(false);
				setTxnId(dtResponse.data.txnId);
				toast.success(dtResponse.data.message || "OTP sent successfully");
				setShowModal(true);
			} else {
				setIsPageLoading(false);
				toast.error(dtResponse.data?.message || "Failed to send OTP");
			}

		} catch (error) {
			setIsPageLoading(false);
			// Backend returned an error response
			if (error.response.data.success === false && error.response.data.message === "X-token expired") {
				toast.error(error.response.data.message);
				setTimeout(() => {
					handleLogout();
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

	const handleVerifyOtp = async () => {
		if (!otp || otp.length !== 6) {
			toast.error("Please enter a valid 6-digit OTP");
			return;
		}

		setIsPageLoading(true);

		try {
			const sessionResponse = await createSession();
			const token = sessionResponse?.accessToken;
			const xToken = localStorage.getItem("x_token");

			const encryptedOtp = await encryptString(otp);

			const endpoint = selectedOption === 'de-activate'
				? '/abha/account/de-activate/verify-otp'
				: '/abha/account/delete/verify-otp';

			const headers = {
				'accesstoken': `${token}`,
				'xtoken': xToken
			};

			const payload = {
				txnId: txnId,
				otp: encryptedOtp
			};

			const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, { headers });
			const dtResponse = response.data;

			if (dtResponse.success) {
				if (dtResponse?.data?.authResult === 'success') {
					toast.success(
						selectedOption === 'de-activate'
							? "Account deactivated successfully"
							: "Account deleted successfully"
					);
					setTimeout(() => {
						handleLogout();
					}, 3000);
				} else {
					toast.error(dtResponse.data.message || "Wrong OTP. Please try again.");
					setTxnId(dtResponse.data.txnId);
					setIsPageLoading(false);
				}
			} else {
				setIsPageLoading(false);
				toast.error(dtResponse.data?.message || "Verification failed");
			}

		} catch (error) {
			setIsPageLoading(false);
			// Backend returned an error response
			if (error.response.data.success === false && error.response.data.message === "X-token expired") {
				toast.error(error.response.data.message);
				setTimeout(() => {
					handleLogout();
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

	const handleCancel = () => {
		navigate('/my-profile');
	};

	return (
		<>
			<div className="mainFlow">
				<Header />
				<ToastContainer />
				{isPageLoading && <Loader />}
				<div className="container">
					<div className="pranHealtnMainUserFlow">
						<div className="abha-paranLogo">
							<img src={MixLogo} alt="Logo" />
						</div>
						<div className="userFlowAdharVer">
							<div className="user-profile-dashboard">
								<SidebarMenu activePage="delete" />
								<div className="centerBoard disableDeactivateAccountProfile">
									<div className="rightProfileMain withoutBorder">
										<div className="deactivate-delete-section">
											<div className="desabled-account-content">
												<h4>Deactivate/Delete Account</h4>
												<p>You can Deactivate or Delete your ABHA by choosing below options</p>
											</div>
											<div className="account-selectOne">
												<label htmlFor="DeactivateTemporarily" className="DeactivateTemporarily">
													<input
														type="radio"
														name="validate"
														id="DeactivateTemporarily"
														value="de-activate"
														onChange={handleOptionChange}
														checked={selectedOption === 'de-activate'}
													/>
													<div className="selctDisabledAccount">
														<span className="icon"><i className="material-icons">pause</i></span>
														<p>Deactivate Temporarily</p>
													</div>
												</label>
												<label htmlFor="DeletePermanently" className="DeletePermanently">
													<input
														type="radio"
														name="validate"
														id="DeletePermanently"
														value="delete"
														onChange={handleOptionChange}
														checked={selectedOption === 'delete'}
													/>
													<div className="selctDisabledAccount">
														<span className="icon"><i className="material-icons">delete</i></span>
														<p>Delete Permanently</p>
													</div>
												</label>
											</div>
											<div className="DeactivateTemporarilyBoxRow">
												<div className="deaDisColBox">
													<img src={Deactivate1} alt="Deactivate 1" />
													<p>You will lose all access to ABDM application</p>
												</div>
												<div className="deaDisColBox">
													<img src={Deactivate2} alt="Deactivate 2" />
													<p>Your health records will be inaccessible</p>
												</div>
												<div className="deaDisColBox">
													<img src={Deactivate3} alt="Deactivate 3" />
													<p>You can reactivate your account anytime</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bottomDashboard">
								<div className="saveBtnProfile justify-content-center">
									<button className="custBtn btnThems" onClick={handleCancel}>Cancel</button>
									<button
										className={`custBtn ${!selectedOption ? 'disabled' : 'btnThems'}`}
										onClick={sendOTP}
										disabled={!selectedOption}
									>
										Continue
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showModal && (
				<DeActivateVeryfyOTP
					onClose={() => setShowModal(false)}
					otp={otp}
					onOtpChange={handleOtpChange}
					onVerify={handleVerifyOtp}
					isVerifying={isPageLoading}
				/>
			)}
		</>
	);
};

export default DeleteDeactivateAccount;
