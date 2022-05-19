import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState} from "../../Store";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css" 

import { Login } from "../../Components/LoginForm/LoginForm";

export const LoginPage: React.FC = () => {

  const  userState = useSelector((state:RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if(!userState.error && userState.user && userState.user.role === 1) {
      navigator('/home')
    }
    if(!userState.error && userState.user && userState.user.role === 2){
      navigator('/managerHome')
    }
  }, [userState])

    return(
        <div className="employee-page">
          {userState.error ? <h2 className="login-error">Username or password is incorrect.</h2> : <></>}
          <Login/>
        </div>
    )

}

// import React, {useState, useEffect} from "react";
// import axios from "axios";
// import { IUser } from "../../Interfaces/IUser";
// import { IReimbursement } from "../../Interfaces/IReimbursement";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Reimbursement } from "../../Components/Reimbursement/Reimbursement";
// import './EmployeePage.css'


// export const EmployeePage: React.FC<IUser> = (user:IUser) => {

//     const [reimbursements, setReimbursements] = useState<IReimbursement[]>([])
//     const [showForm, setShowForm] = useState(false);
//     const [showPending, setShowPending] = useState(false);
//     const [showResolved, setShowResolved] = useState(false);


//     const navigator = useNavigate()

//     const createReimbursement =async () => {
//         setShowForm(!showForm);
//         setShowResolved(false);
//         setShowPending(false);
//     }

//     const sendToDatabase =async() => {
//         axios.defaults.withCredentials = true;
//         let res = await axios.post("http://localhost:8080/reimbursement/create")
//         setReimbursements(res.data)
//     }

//     const getPendingReimbursements =async () => {
//         setShowResolved(false);
//         setShowForm(false);
//         setShowPending(!showPending);
//         axios.defaults.withCredentials = true;
//         let res = await axios.get("http://localhost:8080/employee/view-pending-reimbursements")
//         setReimbursements(res.data)
//     }

//     const getResolvedReimbursements =async () => {
//         setShowPending(false);
//         setShowForm(false);
//         setShowResolved(!showResolved);
//         axios.defaults.withCredentials = true;
//         let res = await axios.get("http://localhost:8080/employee/view-resolved-reimbursements")
//         setReimbursements(res.data)
//         console.log(res.data);
//     }

//     useEffect(() => {
//         //If the firstName is false, this if statement will equate to true
//         if(user.userID < 0){
//             navigator("/login")
//         } 
//         if(reimbursements.length < 1) {
//             getPendingReimbursements()
//         }
//         console.log(reimbursements)
//     }, [reimbursements])

//     return (
//         <>
//         <div className="employeeGreet">
//             <h1>Welcome to Employee Page {user.firstName}</h1>
//             <h2>Home page view</h2>
//             <div className="btn-group">
//                 <button className="btn" onClick={createReimbursement}>Create A New Reimbursement</button>
//                 <button className="btn" onClick={getPendingReimbursements}>View All Pending Reimbursements</button>
//                 <button className="btn" onClick={getResolvedReimbursements}>View All Resolved Reimbursements</button>
//             </div>
//         </div>
            
            

//             {showPending && (
//                 reimbursements.length < 1 ? <h1>No Reimbursements on Record</h1> : reimbursements.map((reimbursement:IReimbursement) => {
//                     console.log("We are here")
//                     return(
//                         <Reimbursement {...reimbursement}/>
//                     )
//                 })
//             )}

//             {showResolved && (
//                 reimbursements.length < 1 ? <h1>No Reimbursements on Record</h1> : reimbursements.map((reimbursement:IReimbursement) => {
//                     console.log("We are here")
//                     return(
//                         <Reimbursement {...reimbursement}/>
//                     )
//                 })
//             )}


//             {showForm && (
//                 <form className="reimbursement-form">
//                     <h3>Create Reimbursement</h3>
//                     <label htmlFor="amount">Amount</label>
//                     <input type="text" name="" id="" />

//                     <label htmlFor="submittedDate">Submitted Date</label>
//                     <input type="date" />

//                     <label htmlFor="description">Desscription</label>
//                     <input type="text" />

//                     <label htmlFor="reimbursementType">Reimbursement Type</label>
//                     <select id="reimbursementType" name="type">
//                         <option value={"lodging"}>LODGING</option>
//                         <option value="travel">TRAVEL</option>
//                         <option value="food">FOOD</option>
//                         <option value="other">OTHER</option>
//                     </select>

//                     <label htmlFor="submit">Submit Reimbursemit</label>
//                     <button onClick={sendToDatabase}>Submit</button>
//                 </form>
//       )}


//         </>
//     )

// }

// import React, {useState} from "react";
// import axios from "axios";

// import { IUser } from "../../Interfaces/IUser";
// import { LoginForm } from "../../Components/LoginForm/LoginForm";

// interface LoginPageProps {
//     liftState: (user:IUser) => void
// }

// export const LoginPage: React.FC<LoginPageProps> = ({liftState}) => {

//     const [error, setError] = useState(false);

//     const loginUser = async (username:string, password:string) => {
//         //We would want to take that email and password, and try to login
//         let loginObj = {
//           username,
//           password
//         }
    
//         try{
//           const res = await axios.post('http://localhost:8080/user/login', loginObj)
//           setError(false)
//           liftState(res.data)
//         } catch (e) {
//           setError(true);
//         }
    
//       }


//       return (
//         <>
//           <LoginForm onClick={loginUser}/>
//           {error ? <h1>Username or password incorrect</h1> : <></>}
//         </>
//       );

// }