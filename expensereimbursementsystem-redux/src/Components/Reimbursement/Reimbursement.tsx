<<<<<<< HEAD
import React from "react";
import { IReimbursement } from "../../Interfaces/IReimbursement";

export const Reimbursement:React.FC<IReimbursement> = (reimbursement:IReimbursement) => {
    return(
        <div className="reimbursement">
            <div className="reimbursement-profile">
                <img src="" alt="" className="reimbursement-image"/>
                <h3 className="reimbursement-user">
                    {reimbursement.reimbursementAuthor}
                </h3>
            </div>

            <div className="">
                <p>{reimbursement.reimbursementType}</p>
            </div>
        </div>
    );
=======
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

>>>>>>> mohamed-frontend
}