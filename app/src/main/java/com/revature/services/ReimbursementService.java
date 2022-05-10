package com.revature.services;

import com.revature.dao.IReimbursementDao;
import com.revature.models.Reimbursement;
import java.util.List;

public class ReimbursementService {

    private IReimbursementDao rDao;

    public ReimbursementService() {}

    public ReimbursementService(IReimbursementDao rd) {
        this.rDao = rd;
    }

    public void employeeCreateReimbursement(double amount, String submittedDate, String resolvedDate,
                                            String description, int reimbursementAuthor, int reimbursementResolver,
                                            int reimbursementStatus, int reimbursementType) {

        Reimbursement r = new Reimbursement(0, amount, submittedDate, resolvedDate, description,
                reimbursementAuthor, reimbursementResolver, reimbursementStatus, reimbursementType);

        rDao.employeeCreateReimbursement(r);
    }

    public List<Reimbursement> employeeViewPendingReimbursements(int authorID, int statusPending) {
        return rDao.employeeViewPendingReimbursements(authorID, statusPending);
    }

    public List<Reimbursement> employeeViewResolvedReimbursements(int authorID, int statusApproved, int statusDenied) {
        return rDao.employeeViewResolvedReimbursements(authorID, statusApproved, statusDenied);
    }

    public List<Reimbursement> managerViewAllPendingReimbursements(int statusPending) {
        return rDao.managerViewAllPendingReimbursements(statusPending);
    }

    public List<Reimbursement> managerViewAllResolvedReimbursements(int statusApproved, int statusDenied) {
        return rDao.managerViewAllResolvedReimbursements(statusApproved, statusDenied);
    }

    public List<Reimbursement> managerViewSpecificEmployeeReimbursements(int authorID) {
        return rDao.managerViewSpecificEmployeeReimbursements(authorID);
    }

    public void updateReimbursementStatus(int reimbursementID, int status) {
        rDao.updateReimbursementStatus(reimbursementID, status);
    }

    public void deleteReimbursement(int reimbursementID) {

        deleteReimbursement(reimbursementID);
    }

    public void approveReimbursement() {

    }

    public void denyReimbursement() {

    }
}
