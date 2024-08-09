import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firbase";
import { useAuthContext } from "../context/AuthContext";

const googleAuthUser = () => {
  const navigate = useNavigate();

  const { setAuthUser } = useAuthContext();

  const handleAuthBtn = async (formData) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    const { displayName, email, photoURL } = result.user;

    const Fetch_API = await fetch("/api/user/google-auth", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ displayName, email, photoURL }),
    });

    const API_Result = await Fetch_API.json();
    if (API_Result.success === false) {
      dispatchData(signInFailuer(true));
      return toast.error(API_Result.message);
    }

    if (API_Result) {
      toast.success(`Wellcome ${API_Result.userName}`);
      localStorage.setItem("Auth-User", JSON.stringify(API_Result));
      setAuthUser(API_Result);
      navigate("/");
      return;
    }
  };
  return { handleAuthBtn };
};

export default googleAuthUser;
