import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../Components/Navbar/Navbar";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import { Reimbursement } from "../../Components/Reimbursement/Reimbursement";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import axios from "axios";
import "./EmployeePage.css";

export const EmployeePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const [reimbursements, setReimbursements] = useState<IReimbursement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    //If the user is not logged in, push them to the login page
    if (!userInfo.user) {
      navigator("/login");
    }
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
  };

  const sendToDatabase = async () => {
    axios.defaults.withCredentials = true;
    let res = await axios.post("http://localhost:8080/reimbursement/create");
    setReimbursements(res.data);
  };

  const getPendingReimbursements = async () => {
    setShowResolved(false);
    setShowForm(false);
    setShowPending(!showPending);
    axios.defaults.withCredentials = true;
    let res = await axios.get(
      "http://localhost:8080/employee/view-pending-reimbursements"
    );
    setReimbursements(res.data);
  };

  const getResolvedReimbursements = async () => {
    setShowPending(false);
    setShowForm(false);
    setShowResolved(!showResolved);
    axios.defaults.withCredentials = true;
    let res = await axios.get(
      "http://localhost:8080/employee/view-resolved-reimbursements"
    );
    setReimbursements(res.data);
    console.log(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="employeeGreet">
        <h1>Welcome: {userInfo.user?.firstName}</h1>
        <h2>Reimbursements</h2>
        <div className="btn-group">
          <button className="btn" onClick={createReimbursement}>
            Create A New Reimbursement
          </button>
          <button className="btn" onClick={getPendingReimbursements}>
            View All Pending Reimbursements
          </button>
          <button className="btn" onClick={getResolvedReimbursements}>
            View All Resolved Reimbursements
          </button>
        </div>
      </div>
      {checkForContent()}

      {showPending &&
        (reimbursements.length < 1 ? (
          <h1>No Reimbursements on Record</h1>
        ) : (
          reimbursements.map((reimbursement: IReimbursement) => {
            console.log("We are here");
            return <Reimbursement {...reimbursement} />;
          })
        ))}

      {showResolved &&
        (reimbursements.length < 1 ? (
          <h1>No Reimbursements on Record</h1>
        ) : (
          reimbursements.map((reimbursement: IReimbursement) => {
            console.log("We are here");
            return <Reimbursement {...reimbursement} />;
          })
        ))}

      {showForm && (
        <form className="reimbursement-form">
          <h3>Create Reimbursement</h3>
          <label htmlFor="amount">Amount</label>
          <input type="text" name="" id="" />

          <label htmlFor="submittedDate">Submitted Date</label>
          <input type="date" />

          <label htmlFor="description">Desscription</label>
          <input type="text" />

          <label htmlFor="reimbursementType">Reimbursement Type</label>
          <select id="reimbursementType" name="type">
            <option value={"lodging"}>LODGING</option>
            <option value="travel">TRAVEL</option>
            <option value="food">FOOD</option>
            <option value="other">OTHER</option>
          </select>

          <label htmlFor="submit">Submit Reimbursemit</label>
          <button className="form-btn" onClick={sendToDatabase}>
            Submit
          </button>
        </form>
      )}
    </>
  );
};
