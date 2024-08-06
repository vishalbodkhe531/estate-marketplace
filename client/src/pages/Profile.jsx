import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Profile() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-3 max-w-lg mx-auto mt-[7rem]">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg"
          readOnly
          value={authUser.userName}
          // {...register("userName", { required: "UserName field is requird" })}
        />
        {/* {errors.userName && (
          <span className="text-red-500 text-sm">
            {errors.userName.message}
          </span>
        )} */}
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          readOnly
          value={authUser.email}
          // {...register("email", { required: "Email field is requird" })}
        />
        {/* {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )} */}
        <button
          // disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {/* {loading ? "Loading..." : "Sign Up"} */}
          UPDATE PROFILE
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in here !!</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
    </div>
  );
}

export default Profile;
