import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const logoutUser = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    const Fetch_API = await fetch("/api/user/logout-user");

    const FetchData = await Fetch_API.json();
    if (Fetch_API.ok) {
      toast.success("user successfully logout !!");
      setLoading(false);
      localStorage.removeItem("Auth-User");
      setAuthUser(null);
      return navigate("/sign-in");
    }
    if (FetchData.success === false) {
      setLoading(false);
      return toast.error(FetchData.message);
    }
  };
  return { logout, loading };
};

export default logoutUser;
