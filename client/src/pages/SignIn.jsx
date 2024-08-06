import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSignIn from "../hooks/useSignIn";
import googleAuthUser from "../hooks/googleAuth";

function SignIn() {
  const { userSignIn, loading } = useSignIn();

  const [formData, setFormData] = useState(null);
  const { handleAuthBtn } = googleAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormData = handleSubmit(async (userData) => {
    setFormData(useForm);
    await userSignIn(userData);
  });

  const handleGoogleBtn = (e) => {
    e.preventDefault();
    handleAuthBtn(formData);
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[7rem]">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleFormData} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          {...register("email", { required: "email is requierd" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          {...register("password", {
            required: "password is requierd",
            minLength: {
              value: 6,
              message: "password must be enter in 6 charectors",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <button
          onClick={handleGoogleBtn}
          className="bg-red-600 text-white p-2 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          SIGN WITH GOOGLE
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
    </div>
  );
}

export default SignIn;
