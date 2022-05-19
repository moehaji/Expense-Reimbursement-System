import React from "react";

import "./Reimbursement.css";

import { IReimbursement } from "../../Interfaces/IReimbursement";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";

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
            {reimbursement.reimbursementResolver === 2 ? "Mohamed" : <></>}
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
    </div>
  );
};
