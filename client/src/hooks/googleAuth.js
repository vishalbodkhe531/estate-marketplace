import { toast } from "react-toastify";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firbase";

const googleAuthUser = () => {
  const handleAuthBtn = async (formData) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    console.log(result);

    // const Fetch_API = await fetch("/api/user/google-auth", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    // const API_Result = await Fetch_API.json();
    // console.log(API_Result);
    // if (API_Result.success === false) {
    //   dispatchData(signInFailuer(true));
    //   return toast.error(API_Result.message);
    // }

    // if (API_Result) {
    //   toast.success(`Wellcome ${API_Result.userName}`);
    //   navigeter("/");
    //   return;
    // }
  };
  return { handleAuthBtn };
};

export default googleAuthUser;
