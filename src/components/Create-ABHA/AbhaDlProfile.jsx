import React from "react";
import Upload from '../../assets/images/comman/upload.svg'
const AbhaDlProfile = ({ handleNext, handleBack, profileData, errors, handleChange, handleTermChecked, handleImageUpload }) => (
    <>
        <div className="profileMainSection">

            <div className="row">
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobile"
                            className="filds-form"
                            placeholder="Enter mobile number"
                            maxLength={10}
                            value={profileData?.mobile}
                            onChange={handleChange}
                        />
                        {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Driving Licence number</label>
                        <input
                            type="text"
                            name="dlNumber"
                            className="filds-form"
                            placeholder="Enter Driving Licence"
                            value={profileData.dlNumber}
                            onChange={handleChange}
                        />
                        {errors.dlNumber && <p style={{ color: 'red' }}>{errors.dlNumber}</p>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>First Name*</label>
                        <input
                            type="text"
                            name="firstName"
                            className="filds-form"
                            placeholder="First Name"
                            value={profileData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            className="filds-form"
                            placeholder="Middle Name"
                            value={profileData.middleName}
                            onChange={handleChange}
                        />
                        {errors.middleName && <p style={{ color: 'red' }}>{errors.middleName}</p>}
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Last Name*</label>
                        <input
                            type="text"
                            name="lastName"
                            className="filds-form"
                            placeholder="Last Name"
                            value={profileData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Date Of Birth *</label>
                        <input
                            type="date"
                            name="dob"
                            className="filds-form"
                            placeholder="Date Of Birth"
                            value={profileData.dob}
                            onChange={handleChange}
                        />
                        {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Gendar *</label>
                        <div className="gendareSection">
                            <label>
                                <input type="radio" name="gender" value={profileData.gender} checked={profileData.gender == 'M'} onChange={handleChange} />
                                Male</label>
                            <label>
                                <input type="radio" name="gender" value={profileData.gender} checked={profileData.gender == 'F'} onChange={handleChange} />
                                Female</label>
                            <label>
                                <input type="radio" name="gender" value={profileData.gender} checked={profileData.gender == 'O'} onChange={handleChange} />
                                Other</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>Pincode *</label>
                        <input
                            type="text"
                            name="pincode"
                            className="filds-form"
                            placeholder="Enter Pincode"
                            maxLength={6}
                            value={profileData.pincode}
                            onChange={handleChange}
                        />
                        {errors.pincode && <p style={{ color: 'red' }}>{errors.pincode}</p>}
                    </div>
                </div>
                <div className="col-xs-12 col-md-8">
                    <div className="feilds">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            className="filds-form"
                            placeholder="Enter Address"
                            value={profileData.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>State  *</label>
                        <input
                            type="text"
                            name="state"
                            className="filds-form"
                            placeholder="Enter OTP"
                            value={profileData.state}
                            onChange={handleChange}
                        />
                        {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="feilds">
                        <label>District  *</label>
                        <input
                            type="text"
                            name="district"
                            className="filds-form"
                            placeholder="Enter District"
                            value={profileData.district}
                            onChange={handleChange}
                        />
                        {errors.district && <p style={{ color: 'red' }}>{errors.district}</p>}
                    </div>
                </div>
            </div>

            <div className="uploadImges">
                <p>Please upload a photo of your Driving Licence (Frontside)*</p>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className="dlUploadImg">
                            <h4>Front Side of DL</h4>
                            <div className="uploadBox">
                                <input type="file" accept="image/jpeg, image/png" onChange={(e) => handleImageUpload(e, 'front')} />
                                <img src={Upload} />
                                <p>Drag files here to upload</p>
                                <h6>or browse for files</h6>
                            </div>
                        </div>
                        {errors.dlFront && <p style={{ color: 'red' }}>{errors.dlFront}</p>}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="dlUploadImg">
                            <h4>Back Side of DL</h4>
                            <div className="uploadBox">
                                <input type="file" accept="image/jpeg, image/png" onChange={(e) => handleImageUpload(e, 'back')} />
                                <img src={Upload} />
                                <p>Drag files here to upload</p>
                                <h6>or browse for files</h6>
                            </div>
                        </div>
                        {errors.dlBack && <p style={{ color: 'red' }}>{errors.dlBack}</p>}
                    </div>
                </div>
                <div className="uploadImgCheckBoxPolicy">
                    <label className="terms-condition-section" htmlFor="termsConditionClick">
                        <input type="checkbox" id="termsConditionClick" value="1" onClick={handleTermChecked} />
                        <div className="terms-condition-right">
                            <p>I hereby declare that I have not created another ABHA number to the best of my knowledge. </p></div>
                    </label>
                    {errors.termsAccepted && <p style={{ color: 'red' }}>{errors.termsAccepted}</p>}
                </div>
            </div>


            {/* Add other fields as needed */}
            <div className="feilds feildsBtn mt-5">
                <button onClick={handleBack} className="custBtn btnCancel">Back</button>
                <button onClick={handleNext} className="custBtn btnSuccess">Continue <i className="material-icons">arrow_right_alt</i></button>
            </div>
        </div>
    </>
);

export default AbhaDlProfile;