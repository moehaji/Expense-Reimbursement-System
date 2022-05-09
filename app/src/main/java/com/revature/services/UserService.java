package com.revature.services;

import com.revature.dao.IUserDao;
import com.revature.models.User;

import java.util.List;

public class UserService {

    private IUserDao uDao;

    public UserService(){}

    public UserService(IUserDao uDao) {
        this.uDao = uDao;
    }

    public User viewAccountInformation(String username) {
        return uDao.viewAccountInformation(username);
    }

    public List<User> viewAllEmployees() {
        return uDao.viewAllEmployees();
    }

    public void updateAccountInformation(User u) {
        uDao.updateAccountInformation(u);
    }
}
