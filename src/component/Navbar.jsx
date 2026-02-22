import React from "react";
import logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { useAuthContext } from "@asgardeo/auth-react";
const activeStyle = "flex justify-center border-b-[3px] px-2 border-[#3d2d30]";
const inactiveStyle = "flex justify-center";

function Navbar() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <div>
      <div className="flex  justify-between items-center flex-col sm:flex-row border-b-[1px]  pb-[5px] gap-[10px] sm:gap-[0]">
        <div className="left w-full sm:w-auto flex justify-center sm:pl-[15%] border-b-2 sm:border-b-0 border-b-[#242020]">
          <Link to="/">
            <div className=" flex items-center gap-2 sm:gap-3">
              <div className="pt-[5px]  ">
                <img src={logo} alt="logo" className="w-[90px] sm:w-100px] " />
              </div>
              <p
                className="font-semibold text-4xl text-[#3d2d30] "
                style={{ fontFamily: "Protest Revolution" }}
              >
                Recipe Blog
              </p>
            </div>
          </Link>
        </div>
        <div className="right w-[100%] sm:w-auto sm:pr-[14%]">
          <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[50px] w-[100%] px-[20%] sm:px-[0] font-crimsonPro text-[18px] ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              Home
            </NavLink>
            {state?.isAuthenticated && (
              <>
                <NavLink
                  to="/add-recipe"
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  Add Recipe
                </NavLink>
                <NavLink
                  to="/manage"
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  Manage
                </NavLink>
              </>
            )}

            {state?.isAuthenticated ? (
              <button
                className="flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300 ease-in-out px-4 py-1 bg-[#e02424] text-white text-[18px] sm:text-[16px] rounded-md"
                onClick={() => signOut()}
              >
                Logout
              </button>
            ) : (
              <button
                className="flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300 ease-in-out px-4 py-1 bg-[#046c4e] text-white text-[18px] sm:text-[16px] rounded-md"
                onClick={() => signIn()}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
