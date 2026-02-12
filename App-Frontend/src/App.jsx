import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
