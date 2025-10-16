const WorkDetails = () => {
    return (
        <>
            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Current Work Details</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Are you currently working? *</label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Yes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Work Status *</label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Govt</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Private</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Both</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Nature Of Work *</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Tele Consultation URL</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Place Of work</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Search Facility</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>State</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>District</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default WorkDetails;