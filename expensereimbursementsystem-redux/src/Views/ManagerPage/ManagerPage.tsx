import React from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Store";

export const ManagerPage: React.FC = () => {
    
    const managerInfo = useSelector((state:RootState) => state.user);

    return(
        <div>
            <h1>Welcome: {managerInfo.user?.firstName}</h1>
        </div>
    );
}