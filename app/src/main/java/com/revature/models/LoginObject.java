package com.revature.models;

public class LoginObject {

    public String userName;
    public String password;

    @Override
    public String toString() {
        return "LoginObject{" +
                "username='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
