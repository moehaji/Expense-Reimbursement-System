package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.models.User;

import java.util.List;

public interface IUserDao {

    //Read
    public User viewAccountInformation(String userName);

    public List<User> viewAllEmployees();

    //Update
    public void updateAccountInformation(User u);

}