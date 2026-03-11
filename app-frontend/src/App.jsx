//Router
import { Routes, Route } from "react-router-dom";

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

//Role based protection of routes
import RoleBasedRoute from "./components/route-types/RoleBasedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="contact" element={<Contact />} />

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
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="devices" element={<AdminDevices />} />
        <Route path="devices/:id" element={<EditDevice />} />
        <Route path="forbidden" element={<Forbidden />} />

        {/* Admin 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
