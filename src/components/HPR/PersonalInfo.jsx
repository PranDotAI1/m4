const PersonalInfo = () => {
    return (
        <>
            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Personal Details</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-2">
                            <div className="feilds">
                                <label>Title *</label>
                                <select>
                                    <option>Dr.</option>
                                    <option>Mr.</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-10">
                            <div className="feilds">
                                <label>Full Name</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Nationality</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Language Spoken *</label>
                                <select>
                                    <option>English</option>
                                    <option>Hindi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Address <span>(as per Aadhar KYC)</span></h4>
                </div>
                <div className="boxHprBody">
                    <div className="addressInfoData">
                        Road, opp. Hotel Courtyard Tree, Hinkal, Bhogadi, Mysuru, Karnataka 570026
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Communication Address</h4>
                </div>
                <div className="boxHprBody">
                    <div className="cummCheckBox">
                        <label>
                            <input type="checkbox" />
                            <p>Is your communication address same as above?</p>
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Address</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Pincode *</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Sub District</label>
                                <select>
                                    <option>Delhi</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>City/Town/Village</label>
                                <select>
                                    <option>Delhi</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>District *</label>
                                <select>
                                    <option>Delhi</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>State/Union Territory *</label>
                                <select>
                                    <option>Delhi</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Country *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalInfo