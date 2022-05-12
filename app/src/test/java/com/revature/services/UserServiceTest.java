package com.revature.services;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.revature.dao.IUserDao;
import com.revature.models.User;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    static IUserDao uDao;

    @InjectMocks
    static UserService uServ;

    @Before
    public void setupBeforeMethods(){
        System.out.println("This runs once before each method in this class");
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void validLoginCredentialsTest() {

        // Given
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@mail.com", 1);

        // When
        when(uDao.employeeViewAccountInformation(u.getUserName())).thenReturn(u);

        User loggedIn = uServ.login("john123", "password");
        verify(uDao).employeeViewAccountInformation(u.getUserName());

        // Then
        assertEquals("The username should be: john123", u, loggedIn);
    }

    @Test
    public void wrongUsernameLoginCredentialsTest() {

        // Given
        User u = null;

        // When
        when(uDao.employeeViewAccountInformation(any())).thenReturn(u);

        User loggedIn = uServ.login("john123", "password");

        // Then
        // Username is not correct and couldn't retrieve someone from the mock database
        assertEquals("The username is incorrect", null, loggedIn);
    }

    @Test
    public void wrongPasswordLoginCredentialsTest() {

        // Given
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@mail.com", 1);

        // When
        when(uDao.employeeViewAccountInformation(any())).thenReturn(u);

        User loggedIn = uServ.login("john123", "passw");
        verify(uDao).employeeViewAccountInformation(u.getUserName());

        // Then
        assertEquals("The password is incorrect", null, loggedIn);
    }

    @Test
    public void verifyManagerCanViewAllEmployeesTest() {

        // Given
        List<User> allEmployees = new ArrayList<>();
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@mail.com", 1);
        allEmployees.add(u);

        // When
        when(uDao.managerViewAllEmployees()).thenReturn(allEmployees);

        List<User> allEmployeeList = uServ.managerViewAllEmployees();
        verify(uDao).managerViewAllEmployees();

        // Then
        assertEquals("Manager viewed all employees", allEmployees, allEmployeeList);
    }

    @Test
    public void verifyEmployeeCanUpdateEmailTest() {

        // Given
        User u = new User(3, "john123", "password", "John",
                "Smith", "john@mail.com", 1);

        u.setEmail("smith@mail.com");

        // When
        when(uDao.employeeUpdateAccountInformation(u, 3)).thenReturn(u);

        User updatedUser = uServ.employeeUpdateAccountInformation(u, 3);
        verify(uDao).employeeUpdateAccountInformation(u, u.getUserID());

        // Then
        assertEquals("User updated their email", u, updatedUser);
    }

    @Test (expected=Exception.class)
    public void verifyCanNotUpdateUsernameOrEmailThatAlreadyExistsTest() {
        // Given
        User u = null;

        // When
        when(uDao.employeeUpdateAccountInformation(any(), any())).thenReturn(u);

        verify(uDao).employeeUpdateAccountInformation(any(), any());
    }
}
