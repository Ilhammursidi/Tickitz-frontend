import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ActivatePage from "./pages/ActivatePage";
import Done from "./pages/Done";
import { Toaster } from "react-hot-toast";

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
      </Routes >
    </>
  )
}

export default App
