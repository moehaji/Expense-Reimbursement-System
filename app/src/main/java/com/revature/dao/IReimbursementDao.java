package com.revature.dao;

import com.revature.models.Reimbursement;
import java.util.List;

public interface IReimbursementDao {

    // CREATE
    public void employeeCreateReimbursement(Reimbursement r);

    // READ
    public List<Reimbursement> employeeViewPendingReimbursements(int authorID, int statusPending);

    public List<Reimbursement> employeeViewResolvedReimbursements(int authorID, int statusApproved, int statusDenied);

    public List<Reimbursement> managerViewAllPendingReimbursements(int statusPending);

    public List<Reimbursement> managerViewAllResolvedReimbursements(int statusApproved, int statusDenied);

    public List<Reimbursement> managerViewSpecificEmployeeReimbursements(int authorID);

    // UPDATE
    public Reimbursement managerUpdateReimbursementStatus(Reimbursement r, int status);
}
