

package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementStatus;
import com.revature.models.ReimbursementType;
import com.revature.models.User;
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

        String sql = "insert into reimbursement (amount, submitted_date, resolved_date, " +
                "description, reimbursement_author, " +
                "reimbursement_resolver, reimbursement_status, " +
                "reimbursement_type) values " +
                "('" + r.getAmount() + "','" + r.getSubmittedDate() + "','" + r.getResolvedDate() + "','" + r.getDescription() + "','" + r.getReimbursementAuthor()
                + "','" + r.getReimbursementResolver() + "','" + r.getReimbursementStatus() + "','" + r.getReimbursementType() + "')";

        try {
            Statement s = c.createStatement();
            s.execute(sql);
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
    public Reimbursement viewSpecificReimbursement(int id) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_id = ?";
        Reimbursement r = null;

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                        rs.getInt(8), rs.getInt(9));
            }
        } catch (SQLException e) {
           e.printStackTrace();
        }
        return r;
    }

    @Override
    public List<Reimbursement> viewPendingReimbursement(int id) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_status = ?";
        Reimbursement r = null;
        List<Reimbursement> statusList = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                        rs.getInt(8), rs.getInt(9));
                statusList.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return statusList;
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
    public void deleteReimbursement(int id) {

    }


}