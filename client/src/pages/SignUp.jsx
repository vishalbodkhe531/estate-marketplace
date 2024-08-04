import React from "react";
import { Link } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";
import { useForm } from "react-hook-form";

function SignUp() {
  const { userSignIn } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = handleSubmit((userData) => {
    console.log(userData);
  });

  return (
    <div className="p-3 max-w-lg mx-auto mt-[7rem]">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          {...register("userName", { required: "UserName field is requird" })}
        />
        {errors.userName && (
          <span className="text-red-500 text-sm">
            {errors.userName.message}
          </span>
        )}
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          {...register("email", { required: "Email field is requird" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          {...register("password", { required: "Password field is requird" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button
          // disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {/* {loading ? "Loading..." : "Sign Up"} */}
          Sign Up
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
    </div>
  );
}

export default SignUp;
