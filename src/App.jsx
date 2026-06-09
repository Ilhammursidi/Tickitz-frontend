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
import { RequireRegistration } from "./components/ProtectedRoute";
import { RequireActivationSuccess } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="auth">
          <Route index element={<Login />} />
          <Route path="register">
            <Route index element={<Register />} />
            <Route element={<RequireRegistration />}>
              <Route path="activate">
                <Route index element={<ActivatePage />} />
                <Route element={<RequireActivationSuccess />}>
                  <Route path="done" element={<Done />} />
                </Route>
              </Route>
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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path='profile' element={<ProfilePage />} />
      </Routes >
    </>
  )
}

export default App
