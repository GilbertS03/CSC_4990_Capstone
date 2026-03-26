import { NavLink } from 'react-router-dom'
import Slides from './Slides'
function Home(){

    return(
        <>
            <div id='slides' className='container d-flex justify-content-center mt-5'>
                <Slides />
            </div>
            <div>
                <h3 className='text-center mt-3'>This can be school events, pictures of machines, how it works, will discuss this</h3>
            </div>
        </>
    )
}
export default Home;