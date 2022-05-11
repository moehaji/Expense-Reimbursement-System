package com.revature.dao;

import com.revature.models.User;
import java.util.List;

public interface IUserDao {

    // READ
    public User employeeViewAccountInformation(String username);

    public List<User> managerViewAllEmployees();

    // UPDATE
    public User employeeUpdateAccountInformation(User u, int userID);

}