import React, { useState } from "react";
import AdharCard from '../../assets/images/comman/aadhar-card.png'
import DL from '../../assets/images/comman/DL.png'

const VerificationModel = ({ onClose, onContinue }) => {

    const [selectedType, setSelectedType] = useState(null);

    return (
        <>
            <div className="modal fade show d-block verificationModel" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 flex-column-reverse">
                            <div className="text-center headerText">
                                <h5 className="modal-title" id="exampleModalLabel">Verification Type</h5>
                                <p>Select any one type from below option to continue</p>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <div className="veryFicationType">
                                <div
                                    className={`veryFicationTypeBox ${selectedType === 'aadhaar' ? 'selected' : ''}`}
                                    onClick={() => setSelectedType('aadhaar')}
                                >
                                    <img src={AdharCard} />
                                    <h4>Aadhar</h4>
                                </div>
                                <div
                                    className={`veryFicationTypeBox ${selectedType === 'dl' ? 'selected' : ''}`}
                                    onClick={() => setSelectedType('dl')}
                                >
                                    <img src={DL} />
                                    <h4>Driving Licence</h4>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="custBtn btnCancel" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                            <button type="button" className="custBtn btnSuccess" disabled={!selectedType}
                                onClick={() => onContinue(selectedType)}>Continue <i className="material-icons">arrow_right_alt</i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerificationModel;