const BasicInfo = () => {
    return (
        <>
            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Registration form</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Mobile Number*</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Email*</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>District *</label>
                                <select>
                                    <option>ABC</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Sub District *</label>
                                <select>
                                    <option>ABC</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Select role</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Category *</label>
                                <select>
                                    <option>ABC</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Sub Category *</label>
                                <select>
                                    <option>ABC</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds mb-0">
                                <label>Healthcare Professional ID/Username* </label>
                                <input type="text" />
                            </div>
                            <div className="Suggestions">
                                <p>Suggestions</p>
                                <div className="suugHint">
                                    <span>sharma3171985</span>
                                    <span>Rahul1985</span>
                                    <span>Rahulsharma3171985</span>
                                    <span>rahul3171985</span>
                                    <span>Rahulsharma</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="passwordSection">
                        <h6>Password</h6>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <div className="feilds">
                                    <label>Password*</label>
                                    <input type="password" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <div className="feilds">
                                    <label>Confirm Password*</label>
                                    <input type="password" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="hprBtn">
                <button className="custBtn btnCancel">Reset</button>
                <button className="custBtn btnCancel">Save as a Draft </button>
                <button className="custBtn btnSuccess">Continue <i className="material-icons">arrow_right_alt</i></button>
            </div>

        </>
    )
}

export default BasicInfo;