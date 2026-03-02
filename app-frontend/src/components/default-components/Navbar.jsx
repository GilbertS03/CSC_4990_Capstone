import { NavLink } from 'react-router-dom';
import WoMM from '../../assets/WoMM.jpg'
import '../../App.css'
function Navbar() {

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <NavLink id='NavImg' to='/' end>
                    <img src={WoMM}/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink
                            className="nav-link"
                            to='/'
                            end
                        >
                        Home
                        </NavLink>
                        <NavLink
                            className='nav-link'
                            to='/reserve'
                            end
                        >
                            Reserve a Computer
                        </NavLink>
                        <NavLink 
                            className='nav-link' 
                            to='/about' 
                            end
                        >
                            About Us
                        </NavLink>
                        <NavLink
                        className='nav-link'
                        to='/login'
                        end>
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;