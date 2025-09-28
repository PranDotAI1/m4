import React from "react";

const AbhaConsent = ({ mobile, handleMobileChange, handleNext }) => (
    <>
        <div className="feilds" style={{ width: '364px' }}>
            <label>Enter Mobile Number</label>
            <input
                type="text"
                className="filds-form"
                placeholder="Enter Mobile Number"
                value={mobile}
                autoComplete="off"
                maxLength={10}
                onChange={handleMobileChange}
            />
        </div>
        <div className="feilds feildsBtn mt-5">
            <button onClick={handleNext} className={`custBtn ${mobile.length == 10 ? 'btnSuccess' : 'disabled'}`} disabled={mobile.length !== 10}>
                Continue <i className="material-icons">arrow_right_alt</i>
            </button>
        </div>
    </>
);

export default AbhaConsent;