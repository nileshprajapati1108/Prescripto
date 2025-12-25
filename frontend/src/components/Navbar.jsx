import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* LOGO */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-44 cursor-pointer"
      />

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        {["/", "/doctors", "/about", "/contact"].map((path, i) => (
          <NavLink key={i} to={path}>
            <li className="py-1">
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </li>
            <hr className="border-none h-0.5 bg-[color:var(--primary)] w-3/5 m-auto hidden" />
          </NavLink>
        ))}

        {/* ADMIN PANEL BUTTON */}
        <button
          onClick={() =>
            window.open(" https://prescripto-1-six.vercel.app/", "_blank")
          }
          className="bg-[color:var(--primary)] text-white px-4 py-1.5 rounded-full text-sm"
        >
          Admin Panel
        </button>
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />

            {/* DROPDOWN */}
            <div className="absolute top-0 right-0 pt-14 hidden group-hover:block z-20">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 text-gray-600">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-[color:var(--primary)] text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}

        {/* MOBILE MENU ICON */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/* MOBILE MENU */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              src={assets.cross_icon}
              alt=""
              onClick={() => setShowMenu(false)}
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {["/", "/doctors", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                onClick={() => setShowMenu(false)}
              >
                <p className="px-4 py-2 rounded-full inline-block">
                  {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
                </p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
