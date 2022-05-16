import React, {useState, useEffect} from "react";
import axios from "axios";
import { IUser } from "../../Interfaces/IUser";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { Navigate, useNavigate } from "react-router-dom";
import { Reimbursement } from "../../Components/Reimbursement/Reimbursement";


export const EmployeePage: React.FC<IUser> = (user:IUser) => {

    const [reimbursements, setReimbursements] = useState<IReimbursement[]>([])

    const navigator = useNavigate()

    const getReimbursements =async () => {
        let res = await axios.get("http://localhost:8080/employee/view-pending-reimbursements")
        setReimbursements(res.data)
        console.log(res.data);
    }

    useEffect(() => {
        //If the firstName is false, this if statement will equate to true
        if(user.userID < 0){
            navigator("/login")
        } 
        if(reimbursements.length < 1) {
            getReimbursements()
        }
        console.log(reimbursements)
    }, [reimbursements])

    return (
        <>
            <h1>Welcome to Employee Page {user.firstName}</h1>
            <h2>Home page view</h2>
            {reimbursements.length < 1 ? <h1>Loading</h1> : reimbursements.map((reimbursement:IReimbursement) => {
                console.log("We are here")
                return(
                    <Reimbursement {...reimbursement}/>
                )
            })}
        </>
    )

}