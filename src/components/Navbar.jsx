import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive ? "bg-white text-black" : "text-white hover:bg-blue-500"
    }`;

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-white tracking-wide"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {/* Only admin sees Candidates */}
            {userRole === "admin" && (
              <NavLink to="/admin/candidates" className={linkClass}>
                Candidates
              </NavLink>
            )}

            {/* Both admin and voter see Voting Status */}
            {(userRole === "admin" || userRole === "voter") && (
              <NavLink to="/voting-status" className={linkClass}>
                Voting Status
              </NavLink>
            )}

            <NavLink to="/results" className={linkClass}>
              Results
            </NavLink>

            {!token ? (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none text-2xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 py-3 flex flex-col space-y-2 animate-slideDown">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {/* Only admin sees Candidates */}
          {userRole === "admin" && (
            <NavLink to="/admin/candidates" className={linkClass}>
              Candidates
            </NavLink>
          )}

          {/* Both admin and voter see Voting Status */}
          {(userRole === "admin" || userRole === "voter") && (
            <NavLink to="/voting-status" className={linkClass}>
              Voting Status
            </NavLink>
          )}

          <NavLink to="/results" className={linkClass}>
            Results
          </NavLink>

          {!token ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
