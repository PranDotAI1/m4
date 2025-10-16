
import Upload from '../../assets/images/comman/upload.svg'

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
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Is the registration permanent or renewal? *</label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Permanent</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Renewable </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Registration valid till *</label>
                                <input type="date" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <div className="feilds">
                                <label>Registration certificate attachment (Latest Certificate)*</label>
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
                        <div className="col-xs-12 col-md-4">
                            <div className='importDigiLocker'>
                                <p>Import from DigiLocker</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Is your name in registration certificate the same as your name in Aadhaar?*</label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Yes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>No </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Qualification Details</h4>
                </div>
                <div className="boxHprBody">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Country of Qualification </label>
                                <div className="newRadioFeildsUI">
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>India</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="renewal" />
                                        <span>Any Other </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Name of the Degree or Diploma *</label>
                                <select>
                                    <option>Bams - Bachelor Of Ayurvedic Medicine And Surge</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Country *</label>
                                <select>
                                    <option>India</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>State *</label>
                                <select>
                                    <option>Karnataka</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>College *</label>
                                <select>
                                    <option>Karnataka</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>University/Affiliated Board *</label>
                                <select>
                                    <option>CCS Uni</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Passing Month</label>
                                <select>
                                    <option>July</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="feilds">
                                <label>Passing Year *</label>
                                <select>
                                    <option>2009</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <div className="feilds">
                                <label>Registration certificate attachment (Latest Certificate)*</label>
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
                        <div className="col-xs-12 col-md-4">
                            <div className='importDigiLocker'>
                                <p>Import from DigiLocker</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Is your name in registration certificate the same as your name in Aadhaar?* </label>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default QualificationsRegistrationDetails;