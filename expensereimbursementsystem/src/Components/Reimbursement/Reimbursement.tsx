import React from "react";

import "./Reimbursement.css";

import { IReimbursement } from "../../Interfaces/IReimbursement";

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
  return (
    <div className="reimbursement">
      <h2>Date Submitted: {reimbursement.submittedDate}</h2>
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
