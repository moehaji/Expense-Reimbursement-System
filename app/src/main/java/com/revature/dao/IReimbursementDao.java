package com.revature.dao;

import com.revature.models.Reimbursement;

import java.util.List;

public interface IReimbursementDao {

    //Create
    public void createReimbursement(Reimbursement r);

    //Read
    public List<Reimbursement> viewAllReimbursement();

    public List<Reimbursement> viewSpecificReimbursement(int id);

    public List<Reimbursement> viewPendingReimbursement();

    public List<Reimbursement> viewAllResolvedReimbursement();

    //Update
    public Reimbursement updateReimbursementStatus(Reimbursement r);

    //Delete
    public void deleteReimbursement(int id);

}