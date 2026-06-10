// import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ActivatePage from "./pages/ActivatePage";
import Done from "./pages/Done";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

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
        </Route>
        {/* <Route path="forgotpassword" element={<ForgotPassword />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path='profile' element={<ProfilePage />}/>
      </Routes >
    </>
  );
}

export default App;
