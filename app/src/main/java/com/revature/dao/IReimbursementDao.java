package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementStatus;

import java.util.List;

public interface IReimbursementDao {

    //Create
    public void createReimbursement(Reimbursement r);

    //Read
    public List<Reimbursement> viewAllReimbursement();

    public Reimbursement viewSpecificReimbursement(int id);

    public List<Reimbursement> viewPendingReimbursement(int id);

    public List<Reimbursement> viewAllResolvedReimbursement();

    //Update
    public Reimbursement updateReimbursementStatus(Reimbursement r);

    //Delete
    public void deleteReimbursement(int id);

}