import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  const { authUser } = useAuthContext();

  return (
    <>
      <header className="bg-slate-900 shadow-md text-white">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-white">Sahand</span>
              <span className="text-red-500">Estate</span>
            </h1>
          </Link>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <ul className="flex gap-4 items-center">
            <Link to="/">
              <li className="hidden sm:inline text-white hover:underline  hover:text-blue-500">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline  text-whitehover:underline hover:text-blue-500">
                About
              </li>
            </Link>
            <Link to="/profile">
              {authUser ? (
                <img
                  className="ml-3 rounded-full h-9 w-9 object-cover border-[1.10px] border-white"
                  src={authUser.profilePic}
                />
              ) : (
                <li className=" text-white hover:underline"> Sign in</li>
              )}
              <li className=" text-slate-700 hover:underline  hover:text-blue-500">
                {" "}
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
