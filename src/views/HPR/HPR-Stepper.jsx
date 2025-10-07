import React, { useState } from 'react';
import PersonalInfo from '../../components/HPR/PersonalInfo';
import QualificationsRegistrationDetails from '../../components/HPR/QuaRegDetails';
import WorkDetails from '../../components/HPR/WorkDetails';
import ProfilePreview from '../../components/HPR/ProfilePreview';

const HPRStepper = () => {
    const steps = ['Personal Info', 'Qualifications & Registration Details', 'Work Details', 'Profile Preview'];
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <PersonalInfo />;
            case 1:
                return <QualificationsRegistrationDetails />;
            case 2:
                return <WorkDetails />;
            case 3:
                return <ProfilePreview />;
            default:
                return null;
        }
    };

    return (
        <div className="stepper-container">
            {/* --- Step circles with labels --- */}
            <div className="stepper-header">
                {steps.map((label, index) => (
                    <React.Fragment key={index}>
                        <div className={`step ${index <= step ? 'active' : ''}`}>
                            <div className="circle">{index + 1}</div>
                            <p>{label}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`line ${index < step ? 'active' : ''}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* --- Step content --- */}
            <div className="step-content">{renderStep()}</div>

            {/* --- Buttons --- */}
            <div className="hprBtn">
                <button className="custBtn btnCancel" onClick={prevStep} disabled={step === 0}>
                    Back
                </button>
                <button className="custBtn btnSuccess" onClick={nextStep} disabled={step === steps.length - 1}>
                    Submit <i className="material-icons">arrow_right_alt</i>
                </button>
            </div>
        </div>
    );
};

export default HPRStepper;
