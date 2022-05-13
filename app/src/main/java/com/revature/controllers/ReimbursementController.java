package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.exceptions.IllegalRoleException;
import com.revature.models.Reimbursement;
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
        String username = (String) ctx.req.getSession().getAttribute("username");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to create a reimbursement");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));
            int authorID = Integer.parseInt((String) ctx.req.getSession().getAttribute("userID"));

            if (role == 1) {
                rServ.employeeCreateReimbursement(r.getAmount(), r.getSubmittedDate(), r.getResolvedDate(),
                        r.getDescription(), authorID, r.getReimbursementResolver(),
                        r.getReimbursementStatus(), r.getReimbursementType(), username);

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
        ctx.header("Access-Control-Expose-Headers", "*");

        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");
        int authorID = Integer.parseInt((String) ctx.req.getSession().getAttribute("userID"));
        String username = (String) ctx.req.getSession().getAttribute("username");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result(oMap.writeValueAsString(rServ.employeeViewPendingReimbursements(authorID, 1, username)));
            } else if (role == 2) {
                ctx.result("Must be an employee");
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleEmployeeViewResolvedReimbursements = (ctx) -> {
        ctx.header("Access-Control-Expose-Headers", "*");

        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");
        int authorID = Integer.parseInt((String) ctx.req.getSession().getAttribute("userID"));
        String username = (String) ctx.req.getSession().getAttribute("username");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result(oMap.writeValueAsString(rServ.employeeViewResolvedReimbursements(authorID, 2,3, username)));
            } else if (role == 2) {
                ctx.result("Must be an employee");
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleManagerViewAllPendingReimbursements = (ctx) -> {
        ctx.header("Access-Control-Expose-Headers", "*");

        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result("Must be a manager");
            } else if (role == 2) {
                ctx.result(oMap.writeValueAsString(rServ.managerViewAllPendingReimbursements(1)));
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleManagerViewAllResolvedReimbursements = (ctx) -> {
        ctx.header("Access-Control-Expose-Headers", "*");

        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result("Must be a manager");
            } else if (role == 2) {
                ctx.result(oMap.writeValueAsString(rServ.managerViewAllResolvedReimbursements(2,3)));
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleManagerViewSpecificEmployeeReimbursements = (ctx) -> {
        ctx.header("Access-Control-Expose-Headers", "*");

        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");
        int authorID = Integer.parseInt(ctx.pathParam("id"));

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result("Must be a manager");
            } else if (role == 2) {
                ctx.result(oMap.writeValueAsString(rServ.managerViewSpecificEmployeeReimbursements(authorID)));
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleManagerApproveReimbursement = (ctx) -> {
        Reimbursement r = oMap.readValue(ctx.body(), Reimbursement.class);
        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result("Must be a manager");
            } else if (role == 2) {
                ctx.result(oMap.writeValueAsString(rServ.managerUpdateReimbursementStatus(r, 2)));
            } else {
                throw new IllegalRoleException();
            }
        }
    };

    public Handler handleManagerDenyReimbursement = (ctx) -> {
        Reimbursement r = oMap.readValue(ctx.body(), Reimbursement.class);
        String loggedIn = (String) ctx.req.getSession().getAttribute("loggedIn");

        if (loggedIn == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else if (loggedIn != null) {
            int role = Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));

            if (role == 1) {
                ctx.result("Must be a manager");
            } else if (role == 2) {
                ctx.result(oMap.writeValueAsString(rServ.managerUpdateReimbursementStatus(r, 3)));
            } else {
                throw new IllegalRoleException();
            }
        }
    };
}
