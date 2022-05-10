package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.utils.ConnectionSingleton;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReimbursementDaoJDBC implements IReimbursementDao {

    private ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();

    public ReimbursementDaoJDBC() {}

    @Override
    public void employeeCreateReimbursement(Reimbursement r) {
        Connection c = cs.getConnection();

//        String sql = "insert into reimbursement (amount, submitted_date, resolved_date, " +
//                "description, reimbursement_author, " +
//                "reimbursement_resolver, reimbursement_status, " +
//                "reimbursement_type) values " +
//                "('" + r.getAmount() + "','" + r.getSubmittedDate() + "','" + r.getResolvedDate() + "','" + r.getDescription() + "','" + r.getReimbursementAuthor()
//                + "','" + r.getReimbursementResolver() + "','" + r.getReimbursementStatus() + "','" + r.getReimbursementType() + "')";
//        Statement s = c.createStatement();
        String sql = "insert into reimbursement (amount, submitted_date, resolved_date, description, " +
                "reimbursement_author, reimbursement_resolver, reimbursement_status, reimbursement_type) " +
                "values (?, ?, ?, ?, ?, ?, ?, ?)";


        try {
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setDouble(1, r.getAmount());
            ps.setString(2, r.getSubmittedDate());
            ps.setString(3, r.getResolvedDate());
            ps.setString(4, r.getDescription());
            ps.setInt(5, r.getReimbursementAuthor());
            ps.setNull(6, r.getReimbursementResolver());
            ps.setInt(7, r.getReimbursementStatus());
            ps.setInt(8, r.getReimbursementType());

            ps.execute();
        } catch (SQLException e ) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Reimbursement> employeeViewPendingReimbursements(int authorID, int statusPending) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_author = ? and reimbursement_status = ?";

        Reimbursement r;
        List<Reimbursement> specificPendingList = new ArrayList<>();

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
                    specificPendingList.add(r);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return specificPendingList;
    }

    @Override
    public List<Reimbursement> employeeViewResolvedReimbursements(int authorID, int statusApproved, int statusDenied) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_author = ? and (reimbursement_status = ? or reimbursement_status = ?)";

        Reimbursement r;
        List<Reimbursement> specificResolvedList = new ArrayList<>();

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
                    specificResolvedList.add(r);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return specificResolvedList;
    }

    @Override
    public List<Reimbursement> managerViewAllPendingReimbursements(int statusPending) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_status = ?";
        Reimbursement r;
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
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return allPendingList;
    }

    @Override
    public List<Reimbursement> managerViewAllResolvedReimbursements(int statusApproved, int statusDenied) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_status = ? or reimbursement_status = ?";
        Reimbursement r;
        List<Reimbursement> allResolvedList = new ArrayList<>();

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
                    allResolvedList.add(r);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return allResolvedList;
    }

    @Override
    public List<Reimbursement> managerViewSpecificEmployeeReimbursements(int authorID) {
        Connection c = cs.getConnection();

        String sql = "select * from reimbursement where reimbursement_author = ?";
        List<Reimbursement> allSpecificEmployeeRequests = new ArrayList<>();

        try {
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setInt(1, authorID);

            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                Reimbursement r = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getInt(7),
                        rs.getInt(8), rs.getInt(9));
                allSpecificEmployeeRequests.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return allSpecificEmployeeRequests;
    }

    @Override
    public void managerUpdateReimbursementStatus(int reimbursementID, int status) {
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

//    @Override
//    public void deleteReimbursement(int reimbursementID) {
//        Connection c = cs.getConnection();
//
//        String sql = "delete from reimbursement where reimbursement_id = ?";
//
//        try {
//            PreparedStatement ps = c.prepareStatement(sql);
//
//            ps.setInt(1, reimbursementID);
//
//            ps.execute();
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//    }
}