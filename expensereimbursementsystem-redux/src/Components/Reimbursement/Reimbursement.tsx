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
}