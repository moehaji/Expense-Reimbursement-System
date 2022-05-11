package com.revature.services;

import com.revature.dao.IUserDao;
import com.revature.exceptions.UsernameOrPasswordIncorrectException;
import com.revature.models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    //We realize that UserService has a dependency UserDao, we need to not rely on this and only test the service
    //So we will use mocking to get rid of this
    @Mock
    static IUserDao ud;

    //We also have to use inject mocks, because UserService depends on UserDao
    @InjectMocks
    static UserService us;

    //Before will run once before every method in this class
    @Before
    public void setupBeforeMethods(){
        System.out.println("This runs once before each method in this class");
        MockitoAnnotations.openMocks(this);
    }

    //Lets test a positive login case
    @Test
    public void validLoginCredentialsTest() throws UsernameOrPasswordIncorrectException {
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@mail.com", 1);

        //When our dao method gets called, instead of searching the database for a user, we will
        //return the precreated used above
        when(ud.employeeViewAccountInformation(any())).thenReturn(u);

        User loggedIn = us.login("john123", "password");
        verify(ud).employeeViewAccountInformation(any());

        //AssertEquals takes in three values
        //Message, Expected, Actual
        assertEquals("The username should be: john123", "john123", loggedIn.getUserName());
        //Then we could write more assertEquals for each of our user properties of our User
    }

    @Test
    public void verifyEmployeeCanUpdateEmail() {
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@l.com", 1);

        //When our dao method gets called, instead of searching the database for a user, we will
        //return the precreated used above
        when(ud.employeeUpdateAccountInformation(u, u.getUserID())).thenReturn(u);

        User updatedUser = us.employeeUpdateAccountInformation(u, 3);
        verify(ud).employeeUpdateAccountInformation(u, u.getUserID());

        //AssertEquals takes in three values
        //Message, Expected, Actual
        assertEquals("Updated to: john@l.com", "john@l.com", updatedUser.getEmail());

    }

    @Test
    public void verifyLogout() {
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@l.com", 1);

        //When our dao method gets called, instead of searching the database for a user, we will
        //return the precreated used above
        when(ud.employeeViewAccountInformation(any())).thenReturn(u);

        us.logout("john123");
        verify(ud).employeeUpdateAccountInformation(u, u.getUserID());

        assertTrue("Did user log out", us.logout("john123"));

        //AssertEquals takes in three values
        //Message, Expected, Actual
        assertEquals("Updated to: john@l.com", "john@l.com", updatedUser.getEmail());

    }
}
