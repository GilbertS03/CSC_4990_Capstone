//Router
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";

//Regular Components
import Home from "./components/home-components/Home";
import Login from "./components/login-and-signup-components/Login";
import About from "./components/home-components/About";
import BuildingsView from "./components/reservation-pages/BuildingsView";
import BuildingRooms from "./components/reservation-pages/Room";
import SpecificRoom from "./components/reservation-pages/SpecificRoom";
import ViewCell from "./components/reservation-pages/ViewCell";
import SignUp from "./components/login-and-signup-components/SignUp";
import Contact from "./components/home-components/Contact";
import Forbidden from "./components/default-components/Forbidden";
import NotFound from "./components/default-components/NotFound";
import UserDetails from "./components/default-components/UserDetails";

//Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

//Admin components
import AdminHome from "./components/admin-components/AdminHome";
import AdminDashboard from "./components/admin-components/DashboardComponents/AdminDashboard";
import AdminDevices from "./components/admin-components/AdminDevices";
import AddDeviceForm from "./components/admin-components/AddDeviceForm";
import EditDevice from "./components/admin-components/EditDevice";
import AdminUsers from "./components/admin-components/AdminUsers";
import EditUser from "./components/admin-components/EditUser";
import AdminSettings from "./components/admin-components/AdminSettings";
import Buildings from "./components/admin-components/Buildings";
import BuildingEditing from "./components/admin-components/BuildingEditing";
import RoomEditing from "./components/admin-components/RoomEditing";
import EditCell from "./components/admin-components/EditCell";
import CreateBuilding from "./components/admin-components/CreateBuilding";
import CreateRoom from "./components/admin-components/CreateRoom";
import Reservations from "./components/admin-components/Reservations";

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
          path="buildings"
          element={
            <RoleBasedRoute publicOnly={false}>
              <BuildingsView />
            </RoleBasedRoute>
          }
        />
        <Route
          path="buildings/:bid"
          element={
            <RoleBasedRoute publicOnly={false}>
              <BuildingRooms />
            </RoleBasedRoute>
          }
        />
        <Route
          path="buildings/:bid/:rid"
          element={
            <RoleBasedRoute publicOnly={false}>
              <SpecificRoom />
            </RoleBasedRoute>
          }
        />
        <Route
          path="buildings/:bid/:rid/:row/:col"
          element={
            <RoleBasedRoute publicOnly={false}>
              <ViewCell />
            </RoleBasedRoute>
          }
        />
        <Route
          path="login"
          element={
            <RoleBasedRoute publicOnly={true}>
              <Login />
            </RoleBasedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <RoleBasedRoute publicOnly={false}>
              <UserDetails />
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
        <Route path="reservations" element={<Reservations></Reservations>} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="devices" element={<AdminDevices />} />
        <Route path="devices/newDevice" element={<AddDeviceForm />} />
        <Route path="devices/:id" element={<EditDevice />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<EditUser />} />
        <Route path="system-settings" element={<AdminSettings />} />
        <Route path="buildings" element={<Buildings />} />
        {/* This will show the rooms that we can edit */}
        <Route path="buildings/create" element={<CreateBuilding />} />
        <Route path="buildings/:id/create-room" element={<CreateRoom />} />
        <Route path="buildings/:id" element={<BuildingEditing />} />
        <Route path="buildings/:id/:rid" element={<RoomEditing />} />
        <Route path="buildings/:id/:rid/:row/:col" element={<EditCell />} />

        <Route path="forbidden" element={<Forbidden />} />

        {/* Admin 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
