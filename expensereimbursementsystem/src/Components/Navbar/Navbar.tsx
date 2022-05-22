import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { logout } from "../../Slices/UserSlice";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import defaultImage from "../../default-profile-pic.png";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <nav className="navbar">
      <img src={defaultImage} alt="Default Profile" className="profile-pic" />
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to={`/user/${user?.userID}`} className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          {user?.role === 1 ? (
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          ) : (
            <Link to={"/managerHome"} className="nav-link">
              Home
            </Link>
          )}
        </li>
        <li className="logout">
          <Link to={"/login"} className="nav-link">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
