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

    public void createReimbursement(double amount, String submittedDate, String resolvedDate, String description,
                                    int reimbursementAuthor, int reimbursementResolver, int reimbursementStatus, int reimbursementType) {

        Reimbursement r = new Reimbursement(0, amount, submittedDate, resolvedDate, description,
                reimbursementAuthor, reimbursementResolver, reimbursementStatus, reimbursementType);

        rDao.createReimbursement(r);
    }

    public List<Reimbursement> viewSpecificPendingRequest(int authorID, int statusPending) {
        return rDao.viewSpecificPendingRequest(authorID, statusPending);
    }

    public List<Reimbursement> viewSpecificResolvedRequest(int authorID, int statusApproved, int statusDenied) {
        return rDao.viewSpecificResolvedRequest(authorID, statusApproved, statusDenied);
    }

    public List<Reimbursement> viewAllPendingRequest(int statusPending) {
        return rDao.viewAllSpecificRequest(statusPending);
    }

    public List<Reimbursement> viewAllResolvedRequest(int statusApproved, int statusDenied) {
        return rDao.viewAllResolvedRequest(statusApproved, statusDenied);
    }

    public List<Reimbursement> viewAllSpecificRequest(int authorID) {
        return rDao.viewAllSpecificRequest(authorID);
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
