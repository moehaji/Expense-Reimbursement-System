package com.revature.models;

public class LoginObject {

    public String username;
    public String password;

    @Override
    public String toString() {
        return "LoginObject{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}