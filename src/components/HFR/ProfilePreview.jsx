
import Profile from '../../assets/images/comman/user-1.png'
const ProfilePreview = () => {
    return (
        <>
            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Profile</h4>
                </div>
                <div className="boxHprBody">
                    <div className="profilePerviewSec">
                        <div className="profielImg">
                            <img src={Profile} />
                            <div className='profileuserDet'>
                                <h4>Rahul Sharma</h4>
                                <p>Bangalore</p>
                            </div>
                        </div>
                        <div className='userProfileData'>
                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <h4>MBBS, MD</h4>
                                </div>
                            </div>
                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <h4>useremail@gmail.com</h4>
                                </div>
                            </div>
                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <h4>987-654-3210</h4>
                                </div>
                            </div>
                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <h4>Private</h4>
                                </div>
                            </div>
                        </div>
                        <div className='userProfileData'>

                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <p>Experience</p>
                                    <h4>1.5 Years</h4>
                                </div>
                            </div>
                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <p>Language Spoken</p>
                                    <h4>English, Hindi, Kannada</h4>
                                </div>
                            </div>
                            <div className='profileDataCol'>
                                <div className='icon'></div>
                                <div className='values'>
                                    <p>System Of Medicine</p>
                                    <h4>Modern Medicine (Allopathy)</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="boxHprTab">
                <div className="boxHprHeader">
                    <h4>Preview your details </h4>
                </div>
                <div className="boxHprBody">
                    <div className='row'>
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>Anyone assisted you to register in HPR? *</label>
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
                        <div className="col-xs-12 col-md-12">
                            <div className="feilds">
                                <label>More Details</label>
                                <textarea rows={4} type="text" ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePreview;