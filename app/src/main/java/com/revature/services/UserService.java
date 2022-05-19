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

    public User login(String username, String password) {
        User u = uDao.employeeViewAccountInformation(username);

        if (u != null) {
            if (password.equals(u.getPassword())) {
                LoggingUtil.logger.info("User: " + u.getUserName() + " logged in successfully");
                return u;
            } else {
                LoggingUtil.logger.error("Username or password was incorrect");
            }
        } else {
            LoggingUtil.logger.error("User: " + username + " was not found in the database");
        }
        return null;
    }

    public List<User> managerViewAllEmployees() {
        LoggingUtil.logger.info("Manager viewed all employees");
        return uDao.managerViewAllEmployees();
    }

    public User employeeUpdateAccountInformation(User u, int userID) {
        User user = uDao.employeeUpdateAccountInformation(u, userID);

        if (user != null) {
            LoggingUtil.logger.info("User: " + u.getUserName() + " updated their account information");
            return user;
        } else {
            LoggingUtil.logger.info("Username or password already exists " + u.getUserName());
            return null;
        }
    }

    public User employeeViewAccountInformationById(int id) {
        return uDao.employeeViewAccountInformationById(id);
    }

}
