import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../Components/Navbar/Navbar";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import { Reimbursement } from "../../Components/Reimbursement/Reimbursement";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./EmployeePage.css";
import { createReimbursementUser } from "../../Slices/UserSlice";

export const EmployeePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const profile = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const [reimbursements, setReimbursements] = useState<IReimbursement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [reimbursementType, setReimbursementType] = useState<any>();
  const [amount, setReimbursementAmount] = useState<any>();
  const [description, setReimbursementDescription] = useState<string>("");
  const [submittedDate, setReimbursementDate] = useState<any>();
  const dispatch: AppDispatch = useDispatch();

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

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReimbursementType(event.target.value);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReimbursementAmount(event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReimbursementDate(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReimbursementDescription(event.target.value);
  };

  const handleCreateReimbursement = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    let createReimbursementInfo = {
      reimbursementID: userInfo.reimbursement?.reimbursementID,
      amount,
      submittedDate,
      description,
      reimbursementAuthor: userInfo.user?.userID,
      reimbursementStatus: 1,
      reimbursementType,
    };

    dispatch(createReimbursementUser(createReimbursementInfo));
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
    <body id="employee">
      <div>
        <Navbar />
        <div className="employeeGreet">
          <h1>Welcome</h1>
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
            <input
              onChange={handleAmountChange}
              className="reimbursement-input"
              placeholder="amount"
              type="text"
              name="clear"
              id=""
              autoComplete="off"
              required
            />

            <label htmlFor="submittedDate">Submitted Date</label>
            <input
              onChange={handleDateChange}
              className="reimbursement-input"
              placeholder="YYYY-MM-DD"
              name="clear"
              type="text"
              autoComplete="off"
              required
            />

            <label htmlFor="description">Desscription</label>
            <input
              onChange={handleDescriptionChange}
              className="reimbursement-input"
              placeholder="max 500 characters"
              name="clear"
              type="text"
              autoComplete="off"
              required
            />

            <label htmlFor="reimbursementType">Reimbursement Type</label>
            <select
              defaultValue={"default"}
              onChange={handleTypeChange}
              id="reimbursementType"
              name="clear"
              required
            >
              <option value="default" disabled>
                Choose Type
              </option>
              <option value={1}>LODGING</option>
              <option value={2}>TRAVEL</option>
              <option value={3}>FOOD</option>
              <option value={4}>OTHER</option>
            </select>

            {/* <label>Submit Reimbursemit</label> */}
            <button className="form-btn" onClick={handleCreateReimbursement}>
              Submit
            </button>
          </form>
        )}
      </div>
    </body>
  );
};
