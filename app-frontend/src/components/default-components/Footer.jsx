import { NavLink } from 'react-router-dom'
import '../../App.css'
function Footer() {

    return (
        <div className='d-flex flex-column '>
            <footer className='d-flex flex-row flex-grow-1 justify-content-around'>
                <div className='container'>
                    <div className="m-2 text-center"><NavLink className='footerLinks' to='/about' end>About Us</NavLink></div>
                </div>    
                <div className='container'>
                    <div className="m-2 text-center"><NavLink className='footerLinks' to='/contact' end>Contact Us</NavLink></div>
                </div>
                <div className='container'>
                    <div className="m-2 text-center"><NavLink className='footerLinks' to='/' end>Something</NavLink></div>
                </div>

            </footer>
        </div>
    )
}

export default Footer;