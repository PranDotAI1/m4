const ProgressBar = ({ step }) => {
    const steps = ["Consent", "Authentication", "Profile", "ABHA Create"];
    return (
        <div className="progress-bar-ABHA">
            {steps.map((label, index) => {
                let color = 'gray';
                if (index + 1 === step) color = '#1A56DB';
                else if (index + 1 < step) color = '#057A55';
                return (
                    <span className="mainPointsNumberRow"
                        key={index}
                        style={{
                            fontWeight: "500",
                            color: `${color}`,
                        }}
                    >
                        <span className="numbers" style={{ borderColor: `${color}`, color: `${color}` }}>{index + 1}</span> {label}
                    </span>
                )
            })}
        </div>

    );
};


export default ProgressBar