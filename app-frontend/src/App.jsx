//Router
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom'

//Componenets
import Navbar from './components/default-components/Navbar'
import Footer from './components/default-components/Footer'
import Home from './components/home-components/Home'
import Login from './components/login-and-signup-components/Login'
import About from './components/home-components/About'
import Reserve from './components/reservation-pages/Reserve'
import BuildingView from './components/reservation-pages/BuildingView'
import SignUp from './components/login-and-signup-components/SignUp'
import Contact from './components/home-components/Contact'
import Forbidden from './components/default-components/Forbidden'
import NotFound from './components/default-components/NotFound'

//Role based protection of routes
import RoleBasedRoute from './components/route-types/RoleBasedRoute'


function App() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1 py-4'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<RoleBasedRoute publicOnly={true} ><Login /></RoleBasedRoute>}></Route>
          <Route path='/signup' element={<RoleBasedRoute publicOnly={true}><SignUp /></RoleBasedRoute>}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/reserve' element={<Reserve />}></Route>
          <Route path='/reserve/:buildingId' element={<BuildingView />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/forbidden' element={<Forbidden />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div >
  )
}

export default App;
