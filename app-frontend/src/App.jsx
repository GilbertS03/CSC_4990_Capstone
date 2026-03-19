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

//Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

//Regular Componenets
import Home from "./components/home-components/Home";
import Login from "./components/login-and-signup-components/Login";
import About from "./components/home-components/About";
import Reserve from "./components/Reserve";
import SignUp from "./components/login-and-signup-components/SignUp";
import Contact from "./components/home-components/Contact";
import Forbidden from "./components/default-components/Forbidden";
import NotFound from "./components/default-components/NotFound";

//Admin components
import AdminHome from "./components/admin-components/AdminHome";
import AdminDevices from "./components/admin-components/AdminDevices";
import EditDevice from "./components/admin-components/EditDevice";
import AdminUsers from "./components/admin-components/AdminUsers";
import EditUser from "./components/admin-components/EditUser";

//Role based protection of routes
import RoleBasedRoute from "./components/route-types/RoleBasedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="reserve"
          element={
            <RoleBasedRoute publicOnly={false}>
              <Reserve />
            </RoleBasedRoute>
          }
        />
        <Route
          path="reserve/:buildingId"
          element={
             <RoleBasedRoute publicOnly={false}>
                <BuildingView />'
              </RoleBasedRoute>
          }
        >

        <Route
          path="login"
          element={
            <RoleBasedRoute publicOnly={true}>
              <Login />
            </RoleBasedRoute>
          }
        />

        <Route
          path="signup"
          element={
            <RoleBasedRoute publicOnly={true}>
              <SignUp />
            </RoleBasedRoute>
          }
        />

        <Route path="forbidden" element={<Forbidden />} />

        {/* Public 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </RoleBasedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="devices" element={<AdminDevices />} />
        <Route path="devices/:id" element={<EditDevice />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<EditUser />} />
        <Route path="forbidden" element={<Forbidden />} />

        {/* Admin 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
