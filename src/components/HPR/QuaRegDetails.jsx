const QualificationsRegistrationDetails = () => {
    return (
        <>
            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>System of Medicine </h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Category</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>System of Medicine</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Registration Details</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Register with Council *</label>
                                <select>
                                    <option>Register</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Register Number *</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Date of First Registration *</label>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QualificationsRegistrationDetails;