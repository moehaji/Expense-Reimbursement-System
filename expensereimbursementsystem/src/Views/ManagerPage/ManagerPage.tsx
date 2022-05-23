import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../Components/Navbar/Navbar";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import { Reimbursement } from "../../Components/Reimbursement/Reimbursement";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { IUser } from "../../Interfaces/IUser";
import { Employee } from "../../Components/Employee/Employee";
import axios from "axios";
import "./ManagerPage.css";
import { Loading } from "../../Components/Loading/Loading";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import { getReimbursementsByID } from "../../Slices/UserSlice";

export const ManagerPage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const [userID, setUserID] = useState<any>();
  const [reimbursements, setReimbursements] = useState<IReimbursement[]>([]);
  const [employees, setEmployees] = useState<IUser[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const [showReimbursementsByID, setShowReimbursementsByID] = useState(false);

  useEffect(() => {
    //If the user is not logged in, push them to the login page
    if (!userInfo.user) {
      navigator("/login");
    }
    console.log(reimbursements);
  }, [userInfo]);

  const checkForContent: any = () => {
    if (reimbursements.length < 1) {
      <h2>Click to view reimbursements</h2>;
    }
  };

  const createReimbursement = async () => {
    setShowForm(!showForm);
    setShowResolved(false);
    setShowPending(false);
    setShowAllEmployees(false);
    setShowReimbursementsByID(false);
  };

  const getAllPendingReimbursements = async () => {
    setShowResolved(false);
    setShowForm(false);
    setShowAllEmployees(false);
    setShowReimbursementsByID(false);
    setShowPending(!showPending);
    axios.defaults.withCredentials = true;
    let res = await axios.get(
      "http://localhost:8080/manager/view-all-pending-reimbursements"
    );
    setReimbursements(res.data);
  };

  const getAllResolvedReimbursements = async () => {
    setShowPending(false);
    setShowForm(false);
    setShowAllEmployees(false);
    setShowReimbursementsByID(false);
    setShowResolved(!showResolved);
    axios.defaults.withCredentials = true;
    let res = await axios.get(
      "http://localhost:8080/manager/view-all-resolved-reimbursements"
    );
    setReimbursements(res.data);
    console.log(res.data);
  };

  const getAllEmployees = async () => {
    setShowPending(false);
    setShowResolved(false);
    setShowForm(false);
    setShowReimbursementsByID(false);
    setShowAllEmployees(!showAllEmployees);
    axios.defaults.withCredentials = true;
    let res = await axios.get("http://localhost:8080/manager/view-employees");
    setEmployees(res.data);
    console.log(res.data);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value);
  };

  const handleGetReimbursementByID = async () => {
    // event.preventDefault();
    setShowPending(false);
    setShowResolved(false);
    setShowForm(false);
    setShowReimbursementsByID(!showReimbursementsByID);

    axios.defaults.withCredentials = true;
    let res = await axios.get(
      `http://localhost:8080/manager/view-specific-employee-reimbursements/${userID}`
    );
    setReimbursements(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="employeeGreet">
        <h1 className="greeting-header">
          Welcome Manager: {userInfo.user?.firstName}
        </h1>
        <h2 className="greeting-header">Reimbursements</h2>
        <div className="btn-group">
          <button className="btn" onClick={createReimbursement}>
            View Reimbursement by Employee
          </button>
          <button className="btn" onClick={getAllPendingReimbursements}>
            View All Pending Reimbursements
          </button>
          <button className="btn" onClick={getAllResolvedReimbursements}>
            View All Resolved Reimbursements
          </button>
          <button className="btn" onClick={getAllEmployees}>
            View All Employees
          </button>
        </div>
      </div>
      {checkForContent()}

      {showPending &&
        (reimbursements.length < 1 ? (
          <h1>No Reimbursements on Record</h1>
        ) : (
          reimbursements.map((reimbursement: IReimbursement) => {
            return <Reimbursement {...reimbursement} />;
          })
        ))}

      {showResolved &&
        (reimbursements.length < 1 ? (
          <h1>No Reimbursements on Record</h1>
        ) : (
          reimbursements.map((reimbursement: IReimbursement) => {
            return <Reimbursement {...reimbursement} />;
          })
        ))}

      {showAllEmployees &&
        (employees.length < 1 ? (
          <h1>No Employees on Record</h1>
        ) : (
          employees.map((employee: IUser) => {
            return <Employee {...employee} />;
          })
        ))}

      {showForm && (
        <form className="reimbursement-form">
          <h3>View Specific Employee</h3>
          <label htmlFor="userID">User ID</label>
          <input type="text" onChange={handleInput} name="user-id" id="" />

          <label htmlFor="submit">Submit Reimbursemit</label>
          <button className="form-btn" onClick={handleGetReimbursementByID}>
            Submit
          </button>
        </form>
      )}

      {showReimbursementsByID &&
        (reimbursements.length < 1 ? (
          <h1>No Reimbursements on Record</h1>
        ) : (
          reimbursements.map((reimbursement: IReimbursement) => {
            return <Reimbursement {...reimbursement} />;
          })
        ))}
    </>
  );
};
