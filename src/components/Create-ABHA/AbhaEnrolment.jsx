import React from "react";

const AbhaEnrolment = ({ handleBack }) => (

    <>
        <div className="abhaCreatedMainBox abhaCreatedCompSuc1">
            <div className="EnrolmentsuccessfullyGenerated">
                <p>Enrolment number is successfully generated.</p>
            </div>
            <div className="notifiedAccordingly">
                <h6>ABHA number will be available after physical verification</h6>
                <p>(You will be notified accordingly)</p>
            </div>
            <div className="EnrolmentNumber ">
                <p>Enrolment number <span>91-2512-2863-0314</span></p>
            </div>
            <div className="compleateReg">
                <p>Please complete your registration at the nearest facility/center to obtain ABHA number. Please do not forget to carry your document and Enrolment number ABDM participating facility.</p>
            </div>
        </div>
        <div className="abhaCreatedMainBox abhaCreatedCompSuc2">
            <ul>
                <li>
                    <h4>Enrolment number</h4>
                    <p>91-2512-2863-0314</p>
                </li>
                <li>
                    <h4>Name</h4>
                    <p>Mohan Mangal</p>
                </li>
                <li>
                    <h4>Verification status</h4>
                    <p>Provisional</p>
                </li>
            </ul>
        </div>
        {/* <div className="feilds feildsBtn mt-5">
                <button onClick={handleBack} className="custBtn btnCancel">Back</button>
            </div> */}
    </>
);

export default AbhaEnrolment;