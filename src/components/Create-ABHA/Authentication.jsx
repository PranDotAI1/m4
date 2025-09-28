import React from "react";

const Authentication = ({ OtpText, handleOtpChange, handleNext, handleBack, errorMessage }) => (
    
    <>
        <div className="feilds" style={{ width: '364px' }}>
            {errorMessage && (
                <p className="notes">{errorMessage}</p>
            )}
        </div>
        <div className="feilds" style={{ width: '364px' }}>
            <label>Enter OTP</label>
            <input
                type="text"
                className="filds-form"
                placeholder="Enter OTP"
                maxLength={6}
                value={OtpText} onChange={handleOtpChange}
            />
        </div>
        <div className="feilds feildsBtn mt-5">
            <button onClick={handleBack} className="custBtn btnCancel">Back</button>
            <button onClick={handleNext} className={`custBtn ${OtpText.length == 6 ? 'btnSuccess' : 'disabled'}`} disabled={OtpText.length !== 6}>Continue <i className="material-icons">arrow_right_alt</i></button>
        </div>
    </>
);

export default Authentication;