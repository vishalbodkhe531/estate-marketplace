import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import updateUser from "../hooks/updateUser";
import { useForm } from "react-hook-form";

function UpdateProfile() {
  const { authUser } = useAuthContext();
  const { useUpdate } = updateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    userName: authUser?.userName || "",
    email: authUser?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    useUpdate(formData);
    // Handle form submission logic
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[7rem]">
      <h1 className="text-3xl text-center font-semibold my-7 text-white">
        Update Profile
      </h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="border p-3 rounded-lg"
          value={formData.userName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-4">
          Update profile
        </button>
        <Link to={"/profile"}>
          <button className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full">
            cancle
          </button>
        </Link>
      </form>
      <div className="flex gap-2 mt-5">
        <Link to="/sign-in">
          <span className="text-white uppercase">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
