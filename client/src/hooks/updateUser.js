import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const updateUser = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();

  const useUpdate = async (formData) => {
    if (!formData.avatar) {
      return;
    }
    // console.log(formData);
    try {
      const response = await fetch(`/api/user/update-user/${authUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User updated successfully");
        localStorage.setItem("Auth-User", JSON.stringify(data));
        setAuthUser(data);
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while update the user.");
    }
  };
  return { useUpdate };
};

export default updateUser;
