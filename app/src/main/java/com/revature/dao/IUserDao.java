package com.revature.dao;

import com.revature.models.User;
import java.util.List;

public interface IUserDao {

    //READ
    public User viewAccountInformation(String username);

    public List<User> viewAllEmployees();

    //UPDATE
    public void updateAccountInformation(User u);

}