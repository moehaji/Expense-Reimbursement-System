import React from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Store";
import "./EmployeePage.css";

export const EmployeePage: React.FC = () => {
    
    const employeeInfo = useSelector((state:RootState) => state.user);
    
    return(
        <div>
            <h1>Welcome: {employeeInfo.user?.firstName}</h1>
        </div>
    );
}