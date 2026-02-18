import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'

function App() {

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='login' element={<Login />}></Route> */}
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
