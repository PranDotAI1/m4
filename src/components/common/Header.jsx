
import Logo from '../../assets/images/logo.svg'

const Header = () => {
    return (
        <header className="headerMain">
            <div className="container">
                <div className="header">
                    <div className="logo-section">
                        <img src={Logo} />
                    </div>
                    <div className="menuSection">
                        <ul>
                            <li><a href="#">Why Pran AI</a></li>
                            <li><a href="#">Platform</a></li>
                            <li><a href="#">Resource</a></li>
                            <li><a href="#">Partnerships </a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;