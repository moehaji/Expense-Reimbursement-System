package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.LoginObject;
import com.revature.models.User;
import com.revature.services.UserService;
import io.javalin.http.Handler;

public class UserController {

    private ObjectMapper oMap;
    private UserService uServ;

    public UserController(UserService uServ) {
        this.uServ = uServ;
        this.oMap = new ObjectMapper();
    }

    public Handler handleEmployeeViewAccountInformation = (ctx) -> {

    };

    public Handler handleManagerViewAllEmployees = (ctx) -> {
        int role = 0;

        if (ctx.req.getSession().getAttribute("role") == null) {
            ctx.status(401);
            ctx.result("Must login to view employees");
        } else {
            role =  Integer.parseInt((String) ctx.req.getSession().getAttribute("role"));
        }

        if(ctx.req.getSession().getAttribute("role") == null) {
            ctx.result("Must login to view employees");
        } else if (role != 2) {
            ctx.result("Must be a manager");
        } else {
            ctx.result(oMap.writeValueAsString(uServ.managerViewAllEmployees()));
        }
    };

    public Handler handleEmployeeUpdateAccountInformation = (ctx) -> {
        User u = oMap.readValue(ctx.body(), User.class);

        ctx.result(oMap.writeValueAsString(uServ.employeeUpdateAccountInformation(u)));
    };

    public Handler handleLogin = (ctx) -> {
        LoginObject lo = oMap.readValue(ctx.body(), LoginObject.class);

        User u = uServ.login(lo.username, lo.password);

        if (u == null) {
            ctx.status(403);
            ctx.result("Username or password was incorrect");
        } else {
            ctx.req.getSession().setAttribute("loggedIn", ""+u.getUserName());
            ctx.req.getSession().setAttribute("role", ""+u.getRole());
            ctx.result(oMap.writeValueAsString(u));
        }
    };

    public Handler handleLogout = (ctx) -> {
    };
}
