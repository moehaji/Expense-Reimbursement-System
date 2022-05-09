package com.revature.dao;

import com.revature.models.Reimbursement;
import java.util.List;

public interface IReimbursementDao {

    // CREATE
    public void createReimbursement(Reimbursement r);

    // READ
    public List<Reimbursement> viewSpecificPendingRequest(int authorID, int statusPending);

    public List<Reimbursement> viewSpecificResolvedRequest(int authorID, int statusApproved, int statusDenied);

    public List<Reimbursement> viewAllPendingRequest(int statusPending);

    public List<Reimbursement> viewAllResolvedRequest(int statusApproved, int statusDenied);

    public List<Reimbursement> viewAllSpecificRequest(int authorID);

    // UPDATE
    public void updateReimbursementStatus(int reimbursementID, int status);

    // DELETE
    public void deleteReimbursement(int reimbursementID);
}