import { NavLink } from 'react-router-dom';
function NotFound(){
    return(
        <div className='container text-center'>
            <h1>404 - Not Found</h1>
            <NavLink className='mt-3' to='/' end>Back to Home</NavLink>
        </div>
    )
}

export default NotFound;