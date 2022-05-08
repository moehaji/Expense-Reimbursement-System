

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
    public List<Reimbursement> viewAllSpecificResolvedReimbursement(int authorID, int statusApproved, int statusDenied) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_author = ? and (reimbursement_status = ? or reimbursement_status = ?)";

        Reimbursement r = null;
        List<Reimbursement> resolvedList = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, authorID);
            ps.setInt(2, statusApproved);
            ps.setInt(3, statusDenied);

            ResultSet rs = ps.executeQuery();

            if (statusApproved == 2 || statusDenied == 3) {
                while(rs.next()){
                    r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                            rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                            rs.getInt(8), rs.getInt(9));
                    resolvedList.add(r);
                }
                return resolvedList;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resolvedList;
    }

    @Override
    public List<Reimbursement> viewAllSpecificPendingReimbursement(int authorID, int statusPending) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_author = ? and reimbursement_status = ?";

        Reimbursement r = null;
        List<Reimbursement> pendingList = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, authorID);
            ps.setInt(2, statusPending);

            ResultSet rs = ps.executeQuery();

            if (statusPending == 1) {
                while(rs.next()){
                    r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                            rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                            rs.getInt(8), rs.getInt(9));
                    pendingList.add(r);
                }
                return pendingList;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return pendingList;
    }

    @Override
    public List<Reimbursement> viewAllPendingList(int statusPending) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_status = ?";
        Reimbursement r = null;
        List<Reimbursement> allPendingList = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, statusPending);

            ResultSet rs = ps.executeQuery();

            if (statusPending == 1) {
                while(rs.next()){
                    r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                            rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                            rs.getInt(8), rs.getInt(9));
                    allPendingList.add(r);
                }
                return allPendingList;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return allPendingList;
    }

    @Override
    public List<Reimbursement> viewAllResolvedList(int statusApproved, int statusDenied) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_status = ? or reimbursement_status = ?";
        Reimbursement r = null;
        List<Reimbursement> resolvedList = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, statusApproved);
            ps.setInt(2, statusDenied);

            ResultSet rs = ps.executeQuery();

            if (statusApproved == 2 || statusDenied == 3) {
                while(rs.next()){
                    r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                            rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                            rs.getInt(8), rs.getInt(9));
                    resolvedList.add(r);
                }
                return resolvedList;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resolvedList;
    }

    @Override
    public void updateReimbursementStatus(int reimbursementID, int status) {
        Connection c = cs.getConnection();

        String sql = "update reimbursement set reimbursement_status = ? where reimbursement_id = ?";

        try {
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setInt(1, status);
            ps.setInt(2, reimbursementID);

            ps.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteReimbursement(int id) {
        Connection c = cs.getConnection();

        String sql = "delete from reimbursement where reimbursement_id = ?";

        try {
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setInt(1,id);
            ps.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}