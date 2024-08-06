import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const userSignUp = async (formData) => {
    setLoading(true);
    const Fetch_API = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    });

    const FetchData = await Fetch_API.json();
    console.log(FetchData);

    if (Fetch_API.ok) {
      setLoading(false);
      toast.success("user successfully created !!");
      return navigate("/sign-in");
    }
    if (FetchData.success === false) {
      setLoading(false);
      return toast.error(FetchData.message);
    }
  };
  return { userSignUp, loading };
};

export default useSignUp;
