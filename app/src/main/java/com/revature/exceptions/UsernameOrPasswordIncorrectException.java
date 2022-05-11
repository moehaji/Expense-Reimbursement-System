package com.revature.exceptions;

public class UsernameOrPasswordIncorrectException extends Exception {

    public UsernameOrPasswordIncorrectException() {
        super("This user input an incorrect username or password");
    }

    public UsernameOrPasswordIncorrectException(String message) {

        super(message);
    }
}
