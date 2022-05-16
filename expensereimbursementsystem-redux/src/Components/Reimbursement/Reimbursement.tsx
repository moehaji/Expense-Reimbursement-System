import React, {useState, useEffect} from "react";

import './Reimbursement.css'

import { IReimbursement } from "../../Interfaces/IReimbursement";

export const Reimbursement:React.FC<IReimbursement> = (reimbursement:IReimbursement) => {

    return(
        <div className="reimbursement">
            <h2>{reimbursement.submittedDate}</h2>
            <p>{reimbursement.description}</p>
            <p>{reimbursement.amount}</p>
        </div>
    )

}