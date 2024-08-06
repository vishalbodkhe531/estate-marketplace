import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectRoutes() {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return authUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

export default ProtectRoutes;
