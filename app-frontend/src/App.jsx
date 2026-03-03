import { Routes, Route } from 'react-router-dom'
import Navbar from './components/default-components/Navbar'
import Footer from './components/default-components/Footer'
import Home from './components/home-components/Home'
import Login from './components/login-and-signup-components/Login'
import About from './components/home-components/About'
import Reserve from './components/Reserve'
import SignUp from './components/login-and-signup-components/SignUp'
import Contact from './components/home-components/Contact'
import ProtectedRoute from './components/helper-routes/ProtectedRoute'
import NotFound from './components/default-components/NotFound'

function App() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1 py-4'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/reserve' element={<ProtectedRoute><Reserve/></ProtectedRoute>}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
