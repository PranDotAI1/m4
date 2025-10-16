const FacilityDetails = () => {
    return (
        <>
            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Facility Details</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-5">
                            <div className="feilds">
                                <label>Linked Program Type *</label>
                                <select>
                                    <option>STMHISID</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-5">
                            <div className="feilds">
                                <label>Registration ID</label>
                                <input type="text" />
                            </div>
                        </div>
                        <hr />
                        <div className="col-xs-12 col-md-5">
                            <div className="feilds">
                                <label>Pincode *</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-5">
                            <div className="feilds">
                                <label>Locate and Select your Facility *</label>
                                <input type="search" />
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
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>State /Union Territory *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>District *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Sub-District *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Village/City/Town *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Adress *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility Contact number</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility Email</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility Landline number</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility Website</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <div className="feilds">
                                <label>Appointment Booking link</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Facility Information Details</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Facility Ownership *</label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Government </span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Private </span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Public & Private Partnership </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <div className="feilds">
                                <label>Facility Ownership Sub-type</label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Profit </span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Non-Profit </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Profit Type</label>
                                <select>
                                    <option>Sole Proprietorship </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>System Of Medicine</label>
                                <div className="listCheckBox">
                                    <label>
                                        <input type="checkbox" />
                                        <span>Modern Medicine </span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Dentisty</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Physiotherapy</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Ayurveda</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Unani</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Siddha</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Sowa Rigpa</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Homeopathy</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility Type *</label>
                                <select>
                                    <option>Sole Proprietorship </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility sub-type *</label>
                                <select>
                                    <option>Sole Proprietorship </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Facility Operation Status *</label>
                                <select>
                                    <option>Sole Proprietorship </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Type of Services (Multiple Selection) *</label>
                                <div className="listCheckBox">
                                    <label>
                                        <input type="checkbox" />
                                        <span>OPD </span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>IPD</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Day Care</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FacilityDetails