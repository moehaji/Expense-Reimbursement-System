package com.revature.services;

import com.revature.dao.IReimbursementDao;
import com.revature.models.Reimbursement;
import com.revature.utils.LoggingUtil;
import java.util.List;

public class ReimbursementService {

    private IReimbursementDao rDao;

    public ReimbursementService() {}

    public ReimbursementService(IReimbursementDao rd) {
        this.rDao = rd;
    }

    public void employeeCreateReimbursement(double amount, String submittedDate, String resolvedDate,
                                            String description, int reimbursementAuthor, int reimbursementResolver,
                                            int reimbursementStatus, int reimbursementType, String username) {

        Reimbursement r = new Reimbursement(0, amount, submittedDate, resolvedDate, description,
                reimbursementAuthor, reimbursementResolver, reimbursementStatus, reimbursementType);

        LoggingUtil.logger.info("Employee with username: " + username + ", created a new reimbursement request" );

        rDao.employeeCreateReimbursement(r);
    }

    public List<Reimbursement> employeeViewPendingReimbursements(int authorID, int statusPending, String username) {
        LoggingUtil.logger.info("Employee with username: " + username + ", viewed their pending reimbursements");
        return rDao.employeeViewPendingReimbursements(authorID, statusPending);
    }

    public List<Reimbursement> employeeViewResolvedReimbursements(int authorID, int statusApproved, int statusDenied, String username) {
        LoggingUtil.logger.info("Employee with username: " + username + ", viewed their resolved reimbursements");
        return rDao.employeeViewResolvedReimbursements(authorID, statusApproved, statusDenied);
    }

    public List<Reimbursement> managerViewAllPendingReimbursements(int statusPending) {
        LoggingUtil.logger.info("Manager viewed all pending reimbursements");
        return rDao.managerViewAllPendingReimbursements(statusPending);
    }

    public List<Reimbursement> managerViewAllResolvedReimbursements(int statusApproved, int statusDenied) {
        LoggingUtil.logger.info("Manager viewed all resolved reimbursements");
        return rDao.managerViewAllResolvedReimbursements(statusApproved, statusDenied);
    }

    public List<Reimbursement> managerViewSpecificEmployeeReimbursements(int authorID) {
        LoggingUtil.logger.info("Manager viewed all the reimbursements of user with id: " + authorID);
        return rDao.managerViewSpecificEmployeeReimbursements(authorID);
    }

    public Reimbursement managerUpdateReimbursementStatus(Reimbursement r, int status) {
        if (status == 2) {
            LoggingUtil.logger.info("Manager approved the reimbursement id: " + r.getReimbursementID());
        } else if (status == 3) {
            LoggingUtil.logger.info("Manager denied the reimbursement id: " + r.getReimbursementID());
        }

        return rDao.managerUpdateReimbursementStatus(r, status);
    }
}
