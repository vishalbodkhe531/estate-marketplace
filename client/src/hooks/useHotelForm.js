import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useHotelForm = () => {
  const navigateUser = useNavigate();
  const { authUser } = useAuthContext();
  const createHotelForm = async (formResult) => {
    const discountPrice = Number(formResult.discountPrice);
    const regularPrice = Number(formResult.regularPrice);
    formResult.userRef = authUser._id;

    if (regularPrice <= discountPrice) {
      return toast.info("offer is to much.....");
    }
    // }

    const responce = await fetch(`/api/listing/create`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formResult),
    });

    const data = await responce.json();

    console.log(data);

    if (responce.ok) {
      toast.success("form successfully submited");
      navigateUser("/profile");
    }
  };
  return { createHotelForm };
};

export default useHotelForm;
