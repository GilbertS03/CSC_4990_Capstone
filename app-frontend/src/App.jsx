import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'
import Reserve from './components/Reserve'
import SignUp from './components/SignUp'

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
          <Route path='/reserve' element={<Reserve />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
