import React from "react";
import "./Reimbursement.css";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Store";
import { approve } from "../../Slices/UserSlice";
import { denied } from "../../Slices/UserSlice";

export const ReimbursementType = {
  Lodging: 1,
  Travel: 2,
  Food: 3,
  Other: 4,
};

export const ReimbursementStatus = {
  Pending: 1,
  Approved: 2,
  Denied: 3,
};

export const Reimbursement: React.FC<IReimbursement> = (
  reimbursement: IReimbursement
) => {
  const user = useSelector((state: RootState) => state.user.user);
  const userInfo = useSelector((state: RootState) => state.user);
  const [reimbursements, setReimbursements] = useState<IReimbursement[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const handleApprove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let approvedReimbursement = {
      reimbursementID: reimbursement.reimbursementID,
      amount: reimbursement.amount,
      submittedDate: reimbursement.submittedDate,
      resolvedDate: "2022-05-24",
      description: reimbursement.description,
      reimbursementAuthor: userInfo.user?.userID,
      reimbursementResolver: 2,
      reimbursementStatus: reimbursement.reimbursementStatus,
      reimbursementType: reimbursement.reimbursementType,
    };

    dispatch(approve(approvedReimbursement));
  };

  const handleDenied = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let deniedReimbursement = {
      reimbursementID: reimbursement.reimbursementID,
      amount: reimbursement.amount,
      submittedDate: reimbursement.submittedDate,
      resolvedDate: "2022-05-24",
      description: reimbursement.description,
      reimbursementAuthor: userInfo.user?.userID,
      reimbursementResolver: 2,
      reimbursementStatus: reimbursement.reimbursementStatus,
      reimbursementType: reimbursement.reimbursementType,
    };

    dispatch(denied(deniedReimbursement));
  };

  return (
    <div className="reimbursement">
      {user?.role === 2 ? (
        <h3>User ID: {reimbursement.reimbursementAuthor}</h3>
      ) : (
        <></>
      )}

      {reimbursement.reimbursementStatus === 2 ||
      reimbursement.reimbursementStatus === 3 ? (
        <span>
          <h3>
            Resolved By:{" "}
            {reimbursement.reimbursementResolver === 5 ? "Mohamed" : <></>}
          </h3>
          <p>Date Resolved: {reimbursement.resolvedDate}</p>
        </span>
      ) : (
        <></>
      )}

      <h3>Date Submitted: {reimbursement.submittedDate}</h3>
      <p className="desc">Description: {reimbursement.description}</p>
      <p>Amount: {reimbursement.amount}</p>
      <p>
        {ReimbursementStatus.Pending === reimbursement.reimbursementStatus ? (
          "PENDING"
        ) : (
          <></>
        )}
        {ReimbursementStatus.Approved === reimbursement.reimbursementStatus ? (
          "APPROVED"
        ) : (
          <></>
        )}
        {ReimbursementStatus.Denied === reimbursement.reimbursementStatus ? (
          "DENIED"
        ) : (
          <></>
        )}
      </p>
      <p>
        {ReimbursementType.Lodging === reimbursement.reimbursementType ? (
          "LODGING"
        ) : (
          <></>
        )}
        {ReimbursementType.Travel === reimbursement.reimbursementType ? (
          "TRAVEL"
        ) : (
          <></>
        )}
        {ReimbursementType.Food === reimbursement.reimbursementType ? (
          "FOOD"
        ) : (
          <></>
        )}
        {ReimbursementType.Other === reimbursement.reimbursementType ? (
          "OTHER"
        ) : (
          <></>
        )}
      </p>
      {reimbursement.reimbursementStatus === 1 && user?.role === 2 ? (
        <span>
          <button className="approved" onClick={handleApprove}>
            Approved
          </button>
          <button className="denied" onClick={handleDenied}>
            Denied
          </button>
        </span>
      ) : (
        <></>
      )}

      {}
    </div>
  );
};
