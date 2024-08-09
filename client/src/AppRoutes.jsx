import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import ProtectRoutes from "./components/ProtectRoutes";
import UpdateProfile from "./pages/UpdateProfile";

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
