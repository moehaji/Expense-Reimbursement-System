package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.exceptions.IllegalRoleException;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.services.ReimbursementService;
import io.javalin.http.Handler;

public class ReimbursementController {

    private ObjectMapper oMap;
    private ReimbursementService rServ;

    public ReimbursementController(ReimbursementService rServ) {
        this.rServ = rServ;
        this.oMap = new ObjectMapper();
    }

    public Handler handleEmployeeCreateReimbursement = (ctx) -> {
        Reimbursement r = oMap.readValue(ctx.body(), Reimbursement.class);

        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to create a reimbursement");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));
            int authorID = Integer.parseInt((String) ctx.req.getSession().getAttribute("userID"));


            if (role == 1) {
                rServ.employeeCreateReimbursement(r.getAmount(), r.getSubmittedDate(), r.getResolvedDate(),
                        r.getDescription(), authorID, r.getReimbursementResolver(),
                        r.getReimbursementStatus(), r.getReimbursementType());
                ctx.status(201);
                ctx.result("Reimbursement created");
            } else if (role == 2) {
                ctx.result("Managers can't create reimbursements");
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleEmployeeViewPendingReimbursements = (ctx) -> {
        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");
        int authorID = Integer.parseInt((String) ctx.req.getSession().getAttribute("userID"));


        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result(oMap.writeValueAsString(rServ.employeeViewPendingReimbursements(authorID, 1)));
            } else if (role == 2) {
                ctx.result("Must be an employee");
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleEmployeeViewResolvedReimbursements = (ctx) -> {
        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");
        int authorID = Integer.parseInt((String) ctx.req.getSession().getAttribute("userID"));


        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result(oMap.writeValueAsString(rServ.employeeViewResolvedReimbursements(authorID, 2,3)));
            } else if (role == 2) {
                ctx.result("Must be an employee");
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleManagerViewAllPendingReimbursements = (ctx) -> {

    };

    public Handler handleManagerViewAllResolvedReimbursements = (ctx) -> {

    };

    public Handler handleManagerViewSpecificEmployeeReimbursements = (ctx) -> {

    };

    public Handler handleManagerUpdateReimbursementStatus = (ctx) -> {

    };

    public Handler handleApproveReimbursement = (ctx) -> {

    };

    public Handler handleDenyReimbursement = (ctx) -> {

    };
}
