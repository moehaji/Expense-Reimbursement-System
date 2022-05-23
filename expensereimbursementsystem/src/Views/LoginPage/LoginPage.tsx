import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Login } from "../../Components/LoginForm/LoginForm";

export const LoginPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if (!userState.error && userState.user && userState.user.role === 1) {
      navigator("/home");
    }
    if (!userState.error && userState.user && userState.user.role === 2) {
      navigator("/managerHome");
    }
  }, [userState]);

  return (
    <div className="employee-page">
      {userState.error ? (
        <h2 className="login-error">Username or password is incorrect.</h2>
      ) : (
        <></>
      )}
      <Login />
    </div>
  );
};
