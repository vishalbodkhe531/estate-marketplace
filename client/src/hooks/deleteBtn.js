import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const deleteBtn = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/user/delete-user/${authUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User deleted successfully. Please log in again.");
        localStorage.removeItem("Auth-User");
        setAuthUser(null);
        navigate("/sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteBtn, loading };
};

export default useDeleteUser;
