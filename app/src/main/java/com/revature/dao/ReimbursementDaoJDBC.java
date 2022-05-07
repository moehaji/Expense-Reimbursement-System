

package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.utils.ConnectionSingleton;

import java.sql.Connection;

public class ReimbursementDaoJDBC implements IReimbursementDao {

    private ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();

    @Override
    public void createReimbursement(Reimbursement r) {
        Connection c = cs.getConnection();

        String sql = "insert into reimbursement " +
                "(amount, submitted_date, resolved_date, description, reimbursement_author, reimbursement_resolver, reimbursement_status, reimbursement_type) " +
                "values ";

    }

}