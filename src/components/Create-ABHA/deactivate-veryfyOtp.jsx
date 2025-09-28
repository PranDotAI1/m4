import React, { useState } from "react";

const DeActivateVeryfyOTP = ({ onClose, otp, onOtpChange, onVerify, isVerifying }) => {


    return (
        <>
            <div className="modal fade show d-block verificationModel" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 flex-column-reverse">
                            <div className="text-center headerText">
                                <h5 className="modal-title" id="exampleModalLabel">Verify OTP</h5>
                                <p>Enter the OTP sent to your mobile.</p>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <div className="veryFicationType">
                                <div className="feilds mb-2 w-75">
                                    <input type="text" className="form-control" placeholder="Enter OTP" maxLength={6} value={otp} onChange={onOtpChange} />
                                    <span className="notes text-end">00:60 Resend OTP</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="custBtn btnCancel" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                            <button type="button" className="custBtn btnSuccess" onClick={onVerify} disabled={isVerifying}>{isVerifying ? 'Verifying...' : 'Verify OTP'} <i className="material-icons">arrow_right_alt</i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeActivateVeryfyOTP;