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

    public List<User> managerViewAllEmployees() {
        LoggingUtil.logger.info("Manager: viewed all employees");
        return uDao.managerViewAllEmployees();
    }

    public User employeeUpdateAccountInformation(User u) {
        LoggingUtil.logger.info("User: " + u.getUserName() + " updated their account information");
        return uDao.employeeUpdateAccountInformation(u);
    }

    public User login(String username, String password) {
        User u = uDao.employeeViewAccountInformation(username);

        if (u != null) {
            if (password.equals(u.getPassword())) {
                LoggingUtil.logger.info("User: " + u.getUserName() + " logged in successfully");
                return u;
            } else {
                LoggingUtil.logger.error("User: " + u.getUserName() + " was not found in the database");
                return null;
            }
        }
        return null;
    }

    public void logout(String username) {
        LoggingUtil.logger.info(username + " has logged out");
    }
}
