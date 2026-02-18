import { NavLink } from 'react-router-dom'
function Home(){

    return(
        <>
            <div className='container d-flex justify-content-center mt-5 '>
                <div className='jumbotron'>
                <h1 className='display-4'> Hello world!</h1>
                <p className='lead'>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hero className='my-4'>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className='lead'>
                        <NavLink to='/' end>Learn More!</NavLink>
                    </p>
                </hero>
            </div>
            </div>
        </>
    )
}
export default Home;