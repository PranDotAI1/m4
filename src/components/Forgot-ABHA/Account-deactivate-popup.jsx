import React, { useState } from "react";
import AdharCard from '../../assets/images/comman/aadhar-card.png'
import DL from '../../assets/images/comman/DL.png'
import { useNavigate } from "react-router-dom";

const DeactivatePopup = ({ onClose, showDeactivateMessage}) => {

    const [selectedType, setSelectedType] = useState(null);

    const navigate = useNavigate();
    const onContinue = () => {
        navigate("/re-activate");
    }

    return (
        <>
            <div className="modal fade show d-block verificationModel" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 flex-column-reverse">
                            <div className="text-center headerText">
                                <h5 className="modal-title text-danger" id="exampleModalLabel">Account  Deactivate</h5>
                                {/* <p>Select any one type from below option to continue</p> */}
                            </div>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} /> */}
                        </div>
                        <div className="modal-body border-top border-bottom">
                            <div className="veryFicationType py-3">
                                <p>{showDeactivateMessage}</p>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="custBtn btnCancel" data-bs-dismiss="modal" onClick={onClose}>Ok</button>
                            <button type="button" className="custBtn btnSuccess" onClick={onContinue}>Continue <i className="material-icons">arrow_right_alt</i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeactivatePopup;