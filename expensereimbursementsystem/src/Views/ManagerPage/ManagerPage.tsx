import React, {useState, useEffect} from "react";
import { IUser } from "../../Interfaces/IUser";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { Navigate, useNavigate } from "react-router-dom";
import { Reimbursement } from "../../Components/Reimbursement/Reimbursement";


export const ManagerPage: React.FC<IUser> = (user:IUser) => {

    const navigator = useNavigate()

    useEffect(() => {
        //If the firstName is false, this if statement will equate to true
        if(user.userID < 0){
            navigator("/login")
        }
    }, [])

    return (
        <>
            <h1>Welcome to Manager Page {user.firstName}</h1>
            <h2>Home page view</h2>
        </>
    )

}