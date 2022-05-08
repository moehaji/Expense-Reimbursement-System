package com.revature.dao;

import com.revature.models.Reimbursement;
import java.util.List;

public interface IReimbursementDao {

    //Create
    public void createReimbursement(Reimbursement r);

    //Read
    // Employee
    public List<Reimbursement> viewAllSpecificPendingReimbursement(int authorID, int statusPending);

    public List<Reimbursement> viewAllSpecificResolvedReimbursement(int authorID, int statusApproved, int statusDenied);

    // Manager
    public List<Reimbursement> viewAllPendingList(int statusPending);

    public List<Reimbursement> viewAllResolvedList(int statusApproved, int statusDenied);

    // UPDATE
    public void updateReimbursementStatus(int authorID, int status);

    //Delete
    public void deleteReimbursement(int id);
}