//Router
import { Routes, Route } from "react-router-dom";

//Componenets
import Navbar from "./components/default-components/Navbar";
import Footer from "./components/default-components/Footer";
import Home from "./components/home-components/Home";
import Login from "./components/login-and-signup-components/Login";
import About from "./components/home-components/About";
import Reserve from "./components/Reserve";
import SignUp from "./components/login-and-signup-components/SignUp";
import Contact from "./components/home-components/Contact";
import Forbidden from "./components/default-components/Forbidden";
import NotFound from "./components/default-components/NotFound";
import AdminHome from "./components/admin-components/AdminHome";

//Role based protection of routes
import RoleBasedRoute from "./components/route-types/RoleBasedRoute";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          {/* Public Only : Cannot be logged in to access */}
          <Route
            path="/login"
            element={
              <RoleBasedRoute publicOnly={true}>
                <Login />
              </RoleBasedRoute>
            }
          ></Route>

          <Route
            path="/signup"
            element={
              <RoleBasedRoute publicOnly={true}>
                <SignUp />
              </RoleBasedRoute>
            }
          ></Route>
          {/* Private Logged in regular user routes */}
          <Route path="/reserve" element={<Reserve />}></Route>

          {/* Admin Routes */}
          {/* todo add protected route around this and ensure no one else can get in except admins */}
          <Route path="/admin" element={<AdminHome />}></Route>

          {/* Error routes */}
          <Route path="/forbidden" element={<Forbidden />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
