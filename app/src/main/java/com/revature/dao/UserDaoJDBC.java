package com.revature.dao;

import com.revature.models.User;
import com.revature.utils.ConnectionSingleton;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDaoJDBC implements IUserDao {
    private ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();

    public UserDaoJDBC(){}

    @Override
    public User employeeViewAccountInformation(String username) {
        Connection c = cs.getConnection();

        String sql = "select * from users where username = ?";

        try {
            User u = null;
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setString(1, username);

            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                u = new User(rs.getInt(1), rs.getString(2), rs.getString(3),
                rs.getString(4), rs.getString(5), rs.getString(6),
                rs.getInt(7));
            }
            return u;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<User> managerViewAllEmployees() {
        Connection c = cs.getConnection();
        List<User> allEmployees = new ArrayList<>();

        String sql = "select * from users where role = ?";

        try {
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setInt(1, 1);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                User u = new User(rs.getInt(1), rs.getString(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getString(6),
                        rs.getInt(7));
                allEmployees.add(u);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return allEmployees;
    }

    @Override
    public User employeeUpdateAccountInformation(User u) {
        Connection c = cs.getConnection();

        String sql = "update users " +
                     "set username = ?, " +
                     "password = ?," +
                     "first_name = ?," +
                     "last_name = ?, " +
                     "email = ? where user_id = ?";

        try {
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setString(1, u.getUserName());
            ps.setString(2, u.getPassword());
            ps.setString(3, u.getFirstName());
            ps.setString(4, u.getLastName());
            ps.setString(5, u.getEmail());
            ps.setInt(6, u.getUserID());

            ps.execute();
            return u;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("ERROR");
            return null;
        }
    }
}
