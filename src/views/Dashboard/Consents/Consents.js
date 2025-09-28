import React from "react";
import PostHeader from "../../../components/common/PostHeader";
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RememberMeOutlinedIcon from '@mui/icons-material/RememberMeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Consents = () => {



    const consentData = [
        { name: "Arjun Mehra", JataayuID: "9876543210@sbx", RequestStatus: "Requested Initiated", CreatedOn: "22 Jun 2024 09: 15 AM", GrantedOn: " -----", Expire: " -----" },
        { name: "Rahul Verma", JataayuID: "1234567890@sbx", RequestStatus: "Granted", CreatedOn: "22 Jun 2024 09: 15 AM", GrantedOn: "03 Nov 2024 02: 45 PM", Expire: "03 Nov 2024 02: 45 PM" },
        { name: "Karan Desai", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Rakesh Nair", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Priya Iyer", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Ananya Reddy", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Meera Choudhary", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Riya Bansal", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Aman Rathore", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Aman Rathore", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Aman Rathore", JataayuID: "9182736450@sbx", RequestStatus: "Granted", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Aman Rathore", JataayuID: "9182736450@sbx", RequestStatus: "Revoked", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Sandeep Joshi", JataayuID: "9182736450@sbx", RequestStatus: "Revoked", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
        { name: "Sandeep Joshi", JataayuID: "9182736450@sbx", RequestStatus: "Revoked", CreatedOn: "17 Jan 2025 11:30 PM", GrantedOn: "17 Jan 2025 11:30 PM", Expire: "17 Jan 2025 11:30 PM" },
    ]


    return (
        <>
            <div className="mainPage consentpage">
                <PostHeader />
                <div className="container-fluid">
                    <div className="mainSection">
                        <aside>
                            <div className="leftTopSection">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <span className="icon"><CallToActionOutlinedIcon /></span>
                                            <span className="text">Dashboard</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon"><PersonOutlineOutlinedIcon /></span>
                                            <span className="text">Patients</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon"><RememberMeOutlinedIcon /></span>
                                            <span className="text">Consents</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="bottomLeftSection">
                                <div className="logout">
                                    Logout
                                </div>
                            </div>
                        </aside>
                        <div className="mainRigtSection">
                            <div className="postSectionHeader consentHeaderSection">
                                <div className="headingSection">
                                    <h4>Consents</h4>
                                </div>
                                <div className="searchSection">
                                    <div className="feilds">
                                        <div className="searchBar">
                                            <input type="text" placeholder="Quick search for anything" />
                                            <span className="searchIcon"><SearchOutlinedIcon /></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightSectionofBtn">
                                    <button className="custBtn btnThems" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Add Consents</button>
                                </div>
                            </div>
                            <div className="postSectionBody">
                                <div className="consentTable table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Jataayu ID</th>
                                                <th>Request Status</th>
                                                <th>Created On</th>
                                                <th>Granted ON</th>
                                                <th>Expire</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consentData.map((items, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td><h5>{items.name}</h5></td>
                                                        <td>{items.JataayuID}</td>
                                                        <td>{items.RequestStatus}</td>
                                                        <td>{items.CreatedOn}</td>
                                                        <td>{items.GrantedOn}</td>
                                                        <td>{items.Expire}</td>
                                                        <td><span><ArrowForwardOutlinedIcon /></span></td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <div className="offcanvas offcanvas-end AddNewConsentsRightPanel" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">ADD New Consents</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <div className="col-xs-12 col-md-12">
                        <div className="feilds">
                            <label>Patients Identifier</label>
                            <input type="text" className="filds-form" placeholder="Enter Aadhar" name="adharno"
                                maxLength="14" autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12">
                        <div className="feilds">
                            <label>Purpose of request</label>
                            <input type="text" className="filds-form" placeholder="Enter Aadhar" name="adharno"
                                maxLength="14" autoComplete='off' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Health info from</label>
                                <input type="date" className="filds-form" autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="feilds">
                                <label>Health info To</label>
                                <input type="date" className="filds-form" autoComplete='off' />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12">
                        <div className="feilds">
                            <label>Health info Type</label>
                            <div className="healthInfoTyle">
                                <label className="terms-condition-section" htmlFor="OPConsultation">
                                    <input type="checkbox" id="OPConsultation" />
                                    <div className="terms-condition-right">
                                        <h4>OP Consultation</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="Prescription">
                                    <input type="checkbox" id="Prescription" />
                                    <div className="terms-condition-right">
                                        <h4>Prescription</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="DiagnosticReports">
                                    <input type="checkbox" id="DiagnosticReports" />
                                    <div className="terms-condition-right">
                                        <h4>Diagnostic Reports</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="WellnessRecord">
                                    <input type="checkbox" id="WellnessRecord" />
                                    <div className="terms-condition-right">
                                        <h4>Wellness Record</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="DischargeSummary">
                                    <input type="checkbox" id="DischargeSummary" />
                                    <div className="terms-condition-right">
                                        <h4>Discharge Summary</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="HealthDocumentRecord">
                                    <input type="checkbox" id="HealthDocumentRecord" />
                                    <div className="terms-condition-right">
                                        <h4>Health Document Record</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="ImmunizationRecord">
                                    <input type="checkbox" id="ImmunizationRecord" />
                                    <div className="terms-condition-right">
                                        <h4>Immunization Record</h4>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12">
                        <div className="feilds">
                            <label>Health info Expiry</label>
                            <input type="date" className="filds-form" autoComplete='off' />
                            <div className="healthInfoExpiry">
                                <label className="terms-condition-section" htmlFor="1Week">
                                    <input type="radio" id="1Week" name="HealthinfoExp" />
                                    <div className="terms-condition-right">
                                        <h4>1 Week</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="15Days">
                                    <input type="radio" id="15Days" name="HealthinfoExp" />
                                    <div className="terms-condition-right">
                                        <h4>15 Days</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="30Days">
                                    <input type="radio" id="30Days" name="HealthinfoExp" />
                                    <div className="terms-condition-right">
                                        <h4>30 Days</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="3Months">
                                    <input type="radio" id="3Months" name="HealthinfoExp" />
                                    <div className="terms-condition-right">
                                        <h4>3 Months</h4>
                                    </div>
                                </label>
                                <label className="terms-condition-section" htmlFor="1Year">
                                    <input type="radio" id="1Year" name="HealthinfoExp" />
                                    <div className="terms-condition-right">
                                        <h4>1 Year</h4>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-footer">
                    <div className="footerBtn">
                        <button className="custBtn btnCancel">Cancel</button>
                        <button className="custBtn disabled">Request  Consent</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Consents;