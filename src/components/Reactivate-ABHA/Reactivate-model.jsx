import React, { useState } from "react";
import Success from '../../assets/images/comman/success.svg'
import { useNavigate } from "react-router-dom";

const ReactivateModel = ({ onClose }) => {

    const [selectedType, setSelectedType] = useState(null);
    const navigate = useNavigate();
    const continueHandler = () => {
        navigate('/login-ABHA');
    }

    return (
        <>
            <div className="modal fade show d-block verificationModel" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content py-3">
                        <div className="modal-header border-bottom-0 flex-column-reverse">
                            <div className="text-center headerText">
                                <img src={Success} className="mb-3" />
                                <p>ABHA number has been reactivated.</p>
                            </div>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} /> */}
                        </div>

                        <div className="modal-footer border-top-0 text-center" style={{ margin: 'auto' }}>
                            <button type="button" className="custBtn btnThems" data-bs-dismiss="modal" onClick={continueHandler}>View Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReactivateModel;