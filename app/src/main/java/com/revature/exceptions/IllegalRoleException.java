package com.revature.exceptions;

public class IllegalRoleException extends Exception{

    public IllegalRoleException() {
        super("This user's role is invalid beyond the standard Employee and Manger role type");
    }

    public IllegalRoleException(String message) {
        super(message);
    }
}
