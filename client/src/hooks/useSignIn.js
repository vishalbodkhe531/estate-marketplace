import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useSignIn = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { authUser, setAuthUser } = useAuthContext();

  const userSignIn = async (formData) => {
    setLoading(true);
    const Fetch_API = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    });

    const FetchData = await Fetch_API.json();
    if (Fetch_API.ok) {
      toast.success("user successfully login !!");
      localStorage.setItem("Auth-User", JSON.stringify(FetchData));
      setAuthUser(FetchData);
      setLoading(false);
      return navigate("/");
    }
    if (FetchData.success === false) {
      setLoading(false);
      return toast.error(FetchData.message);
    }
  };
  return { userSignIn, loading };
};

export default useSignIn;
