package com.revature.services;

import com.revature.dao.IUserDao;
import com.revature.models.User;
import com.revature.utils.LoggingUtil;

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

    public User login(String username, String password) {
        User u = uDao.viewAccountInformation(username);

        if (u != null) {
            if (password.equals(u.getPassword())) {
                return u;
            } else {
                LoggingUtil.logger.error("User " + u.getUserName() + " was not found in the database");
                return null;
            }
        }
        return null;
    }

    public void logout() {
    }
}
