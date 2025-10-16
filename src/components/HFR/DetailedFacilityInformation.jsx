
import Upload from '../../assets/images/comman/upload.svg'

const DetailedFacilityInformation = () => {
    return (
        <>
            {/* <div className="boxHprTab">
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
            </div> */}

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Documents and Phots *</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Facility Building</label>
                                <div className="dlUploadImg">
                                    <div className="uploadBox">
                                        <input type="file" />
                                        <img src={Upload} />
                                        <p>Drag files here to upload</p>
                                        <h6>or browse for files</h6>
                                        <h5>Maximum size allowed for the attachment is 5MB. PNG/JPEG/JPG/PDF file types are supported upload</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Facility Board Photo</label>
                                <div className="dlUploadImg">
                                    <div className="uploadBox">
                                        <input type="file" />
                                        <img src={Upload} />
                                        <p>Drag files here to upload</p>
                                        <h6>or browse for files</h6>
                                        <h5>Maximum size allowed for the attachment is 5MB. PNG/JPEG/JPG/PDF file types are supported upload</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Address Proof Type</label>
                                <select>
                                    <option>Register</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Facility Board Photo</label>
                                <div className="dlUploadImg">
                                    <div className="uploadBox">
                                        <input type="file" />
                                        <img src={Upload} />
                                        <p>Drag files here to upload</p>
                                        <h6>or browse for files</h6>
                                        <h5>Maximum size allowed for the attachment is 5MB. PNG/JPEG/JPG/PDF file types are supported upload</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Linked Program IDs (Optional)</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Does this Facility use a Hospital management system (HMIS)/ Electronic Medical Record (EMR) System?</label>
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
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>NHRR ID</label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>National Identifications Number (NIN) </label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Rohini IDs (As Allotted By IIBI) </label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>AB PMJAY Hospital ID </label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>CGHS Hospital ID </label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>ECHS Hospital ID </label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>State HMIS ID</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>State Insurance Scheme Hospital</label>
                                <select>
                                    <option>Karnataka</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailedFacilityInformation;