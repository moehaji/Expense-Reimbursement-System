package com.revature.services;

import com.revature.dao.IReimbursementDao;
import com.revature.models.Reimbursement;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ReimbursementServiceTest {

    @Mock
    static IReimbursementDao rDao;

    @InjectMocks
    static ReimbursementService rServ;

    @Before
    public void setupBeforeMethods(){
        System.out.println("This runs once before each method in this class");
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void employeeCreateReimbursementTest() {

        doNothing().when(rDao).employeeCreateReimbursement(any());

        rServ.employeeCreateReimbursement(50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1, "Bill");

        verify(rDao).employeeCreateReimbursement(any());
    }

    @Test
    public void employeeViewPendingReimbursements() {
        List<Reimbursement> employeePendingReimbursement = new ArrayList<>();
        Reimbursement r = new Reimbursement(1, 50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1);
        employeePendingReimbursement.add(r);

        // When
        when(rDao.employeeViewPendingReimbursements(r.getReimbursementAuthor(), 1)).thenReturn(employeePendingReimbursement);

        employeePendingReimbursement = rServ.employeeViewPendingReimbursements(r.getReimbursementAuthor(),1, "bill");
        verify(rDao).employeeViewPendingReimbursements(r.getReimbursementAuthor(), 1);

        // Then
        assertEquals("Manager viewed all employees", 1, employeePendingReimbursement.size());
    }

    @Test
    public void employeeViewResolvedReimbursements() {
        List<Reimbursement> employeeResolvedReimbursement = new ArrayList<>();
        Reimbursement r = new Reimbursement(1, 50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1);
        employeeResolvedReimbursement.add(r);

        // When
        when(rDao.employeeViewResolvedReimbursements(r.getReimbursementAuthor(), 2, 3)).thenReturn(employeeResolvedReimbursement);

        employeeResolvedReimbursement = rServ.employeeViewResolvedReimbursements(r.getReimbursementAuthor(),2, 3,"bill");
        verify(rDao).employeeViewResolvedReimbursements(r.getReimbursementAuthor(), 2,3);

        // Then
        assertEquals("Manager viewed all employees", 1, employeeResolvedReimbursement.size());
    }

    @Test
    public void managerViewAllPendingReimbursements() {
        List<Reimbursement> managerViewAllPending = new ArrayList<>();
        Reimbursement r = new Reimbursement(1, 50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1);
        managerViewAllPending .add(r);

        // When
        when(rDao.managerViewAllPendingReimbursements(1)).thenReturn(managerViewAllPending );

        managerViewAllPending  = rServ.managerViewAllPendingReimbursements(1);
        verify(rDao).managerViewAllPendingReimbursements(1);

        // Then
        assertEquals("Manager viewed all employees", 1, managerViewAllPending .size());
    }

    @Test
    public void managerViewAllResolvedReimbursements() {
        List<Reimbursement> managerViewAllResolved = new ArrayList<>();
        Reimbursement r = new Reimbursement(1, 50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1);
        managerViewAllResolved.add(r);

        // When
        when(rDao.managerViewAllResolvedReimbursements(2, 3)).thenReturn(managerViewAllResolved);

        managerViewAllResolved = rServ.managerViewAllResolvedReimbursements(2,3);
        verify(rDao).managerViewAllResolvedReimbursements(2, 3);

        // Then
        assertEquals("Manager viewed all employees", 1, managerViewAllResolved.size());
    }

    @Test
    public void managerViewSpecificEmployeeReimbursements() {
        List<Reimbursement> managerViewSpecificEmployeeReimbursements = new ArrayList<>();
        Reimbursement r = new Reimbursement(1, 50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1);
        managerViewSpecificEmployeeReimbursements.add(r);

        // When
        when(rDao.managerViewSpecificEmployeeReimbursements(1)).thenReturn(managerViewSpecificEmployeeReimbursements);

        managerViewSpecificEmployeeReimbursements = rServ.managerViewSpecificEmployeeReimbursements(1);
        verify(rDao).managerViewSpecificEmployeeReimbursements(1);

        // Then
        assertEquals("Manager viewed all employees", 1, managerViewSpecificEmployeeReimbursements.size());
    }

    @Test
    public void managerUpdateReimbursementStatus() {
        Reimbursement r = new Reimbursement(1, 50, "2022-03-12", null,
                "Hotel trip", 5,
                0, 1, 1);

        r.setReimbursementType(3);

        // When
        when(rDao.managerUpdateReimbursementStatus( r, 3)).thenReturn(r);

        rServ.managerUpdateReimbursementStatus(r,3);
        verify(rDao).managerUpdateReimbursementStatus(r, 3);

        // Then
        assertEquals("Manager viewed all employees", 3, r.getReimbursementType());
    }
}