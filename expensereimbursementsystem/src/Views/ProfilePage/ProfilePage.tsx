import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getUserDetails } from "../../Slices/UserSlice";
import { RootState, AppDispatch } from "../../Store";
import { useState } from "react";
import { edit } from "../../Slices/UserSlice";
import "./ProfilePage.css";

export const ProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.user);
  const [updatedFirstName, setFirstName] = useState<any>(
    profile.currentProfile?.firstName
  );
  const [updatedLastName, setLastName] = useState<any>(
    profile.currentProfile?.lastName
  );
  const [updatedUsername, setUsername] = useState<any>(
    profile.currentProfile?.userName
  );
  const [updatedPassword, setPassword] = useState<any>(
    profile.currentProfile?.password
  );
  const [updatedEmail, setEmail] = useState<any>(profile.currentProfile?.email);
  const dispatch: AppDispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    console.log("Get the info about user: ", id);
    if (id && !profile.currentProfile) {
      dispatch(getUserDetails(id));
    }
    console.log("Current APp State", profile);
  }, [profile]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "firstName") {
      if (event.target.value.length === 0 || event.target.value === null) {
        console.log(event.target.value);
        setFirstName(updatedFirstName);
      } else {
        setFirstName(event.target.value);
      }
    } else if (event.target.name === "lastName") {
      if (event.target.value.length === 0 || event.target.value === null) {
        setLastName(updatedLastName);
      } else {
        setLastName(event.target.value);
      }
    } else if (event.target.name === "username") {
      if (event.target.value.length === 0 || event.target.value === null) {
        setUsername(updatedEmail);
      } else {
        setUsername(event.target.value);
      }
    } else if (event.target.name === "password") {
      if (event.target.value.length === 0 || event.target.value === null) {
        setPassword(updatedPassword);
      } else {
        setPassword(event.target.value);
      }
    } else if (event.target.name === "email") {
      if (event.target.value.length === 0 || event.target.value === null) {
        setEmail(updatedEmail);
      } else {
        setEmail(event.target.value);
      }
    }
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();
    setShowForm(!showForm);
  };

  const handleUpdateProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowForm(false);
    let editProfile = {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      userName: updatedUsername,
      password: updatedPassword,
      email: updatedEmail,
    };

    dispatch(edit(editProfile));
  };

  return (
    <body>
      <div>
        <Navbar />
        <div className="profile-info">
          <h1 className="profile-name">
            Profile of {profile.currentProfile?.firstName}{" "}
            {profile.currentProfile?.lastName}
          </h1>

          {!showForm && (
            <ul className="user-info">
              <li>First Name: {profile.currentProfile?.firstName}</li>
              <li>Last Name: {profile.currentProfile?.lastName}</li>
              <li>Username: {profile.currentProfile?.userName}</li>
              <li>Password: {profile.currentProfile?.password}</li>
              <li>Email: {profile.currentProfile?.email}</li>
              <button
                className="btn-edit"
                name="btn-clicked"
                onClick={handleEdit}
              >
                Edit
              </button>
            </ul>
          )}

          {showForm && (
            <form>
              <h3>Edit Info</h3>
              <label htmlFor="firstName" className="update-label">
                First Name
              </label>
              <input
                onChange={handleInput}
                className="update-input"
                placeholder="first name"
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="off"
              />

              <label htmlFor="lastName" className="update-label">
                Last Name
              </label>
              <input
                onChange={handleInput}
                className="update-input"
                placeholder="last name"
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="off"
              />

              <label htmlFor="username" className="update-label">
                Username
              </label>
              <input
                onChange={handleInput}
                className="update-input"
                placeholder="username"
                type="text"
                name="username"
                id="username"
                autoComplete="off"
              />

              <label htmlFor="password" className="update-label">
                Password
              </label>
              <input
                onChange={handleInput}
                className="update-input"
                placeholder="password"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
              />

              <label htmlFor="email" className="update-label">
                Email
              </label>
              <input
                onChange={handleInput}
                className="update-input"
                placeholder="email"
                type="email"
                name="email"
                id="email"
                autoComplete="off"
              />

              <div>
                <button onClick={handleUpdateProfile} id="form-btn">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </body>
  );
};
