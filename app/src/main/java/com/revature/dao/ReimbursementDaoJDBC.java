

package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.utils.ConnectionSingleton;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReimbursementDaoJDBC implements IReimbursementDao {

    private ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();

    public ReimbursementDaoJDBC(Reimbursement r) {
    }

    @Override
    public void createReimbursement(Reimbursement r) {
        Connection c = cs.getConnection();

        String sql = "insert into reimbursement " +
<<<<<<< HEAD
                "(amount, submitted_date, resolved_date, description, reimbursement_author, " +
                "reimbursement_resolver, reimbursement_status, reimbursement_type) " +
=======
                "(amount, submitted_date, resolved_date, description, reimbursement_author, reimbursement_resolver, reimbursement_status, reimbursement_type) " +
<<<<<<< HEAD
                "values " + "('" + r.getAmount() + "',";
=======
>>>>>>> 224711257767ecc9cd8eb0e257cac7bf1d03d769
                "values (?,?,?,?,?,?,?,?)";

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setDouble(1, r.getAmount());
            ps.setString(2, r.getSubmittedDate());
            ps.setString(3, r.getResolvedDate());
            ps.setString(4, r.getDescription());
            ps.setInt(5, r.getReimbursementAuthor());
            ps.setInt(6, r.getReimbursementResolver());
            ps.setInt(7, r.getReimbursementStatus());
            ps.setInt(8, r.getReimbursementType());
            ps.execute();
        } catch (SQLException e ) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Reimbursement> viewAllReimbursement() {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement";
        List<Reimbursement> reimbursementList = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                Reimbursement r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                        rs.getInt(8), rs.getInt(9));
                reimbursementList.add(r);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reimbursementList;
    }

    @Override
    public List<Reimbursement> viewSpecificReimbursement(int id) {
        return null;
    }

    @Override
    public List<Reimbursement> viewPendingReimbursement() {
        return null;
    }

    @Override
    public List<Reimbursement> viewAllResolvedReimbursement() {
        return null;
    }

    @Override
    public Reimbursement updateReimbursementStatus(Reimbursement r) {
        return null;
    }

    @Override
    public void dleteReimbursement(int id) {
>>>>>>> 886aebfab32a60477123ed95763eaec7a485ab55

    }


}