import React from "react";
import "./Employee.css";
import { IUser } from "../../Interfaces/IUser";

export const Employee: React.FC<IUser> = (employee: IUser) => {
  return (
    <div className="employee">
      <h3>User ID: {employee.userID}</h3>
      <p>Username: {employee.userName}</p>
      <p>First Name: {employee.firstName}</p>
      <p>Last Name: {employee.lastName}</p>
      <p>Email: {employee.email}</p>
    </div>
  );
};
