import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ActivatePage from "./pages/ActivatePage";
import Done from "./pages/Done";
import ProfilePage from "./pages/ProfilePage";
import CheckEmail from "./pages/CheckEmail";
import CheckOTP from "./pages/CheckOTP";
import Reset from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import AddMovie from "./pages/AddMovie";
import ListMovie from "./pages/ListMovie";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="auth">
          <Route index element={<Login />} />
          <Route path="register">
            <Route index element={<Register />} />
            <Route path="activate">
              <Route index element={<ActivatePage />} />
              <Route path="done" element={<Done />} />
            </Route>
          </Route>
          <Route path="forgotpassword">
            <Route index element={<CheckEmail />} />
            <Route path="otp">
              <Route index element={<CheckOTP />} />
              <Route path="reset" element={<Reset />} />
            </Route>
          </Route>
        </Route>
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="list-movie" element={<ListMovie />} />
          <Route path="edit-movie/:id" element={<AddMovie />} />
        </Route>
        <Route path='profile' element={<ProfilePage />} />
      </Routes >
    </>
  )
}

export default App
