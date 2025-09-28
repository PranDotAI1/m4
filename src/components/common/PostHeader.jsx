
import Logo from '../../assets/images/logo.svg'
import User from '../../assets/images/comman/user-profile.png'
import NotificationsIcon from '@mui/icons-material/Notifications';

const PostHeader = () => {
    return (
        <header className="headerMainPostLogin">
            <div className="container-fluid">
                <div className="header">
                    <div className="logo-section">
                        <img src={Logo} />
                    </div>
                    <div className="rightSectionOfHeader">
                        <div className='notification'><NotificationsIcon /></div>
                        <div className='userWithNAme'>
                            <h4>Ramesh Arvind</h4>
                            <img src={User} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PostHeader;