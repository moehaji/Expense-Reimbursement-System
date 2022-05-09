package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Handler;

public class ReimbursementController {

    private ObjectMapper oMap;

    public Handler handleLogin = (ctx) -> {
        String username = ctx.formParam("username");
        String password = ctx.formParam("password");
        ctx.result(username + " " + password);
    };

    public Handler handleCreateReimbursement = (ctx) -> {

    };

    public Handler handleViewSpecificPendingRequest = (ctx) -> {

    };

    public Handler handleViewSpecificResolvedRequest = (ctx) -> {

    };

    public Handler handleViewAllPendingRequest = (ctx) -> {

    };

    public Handler handleViewAllResolvedRequest = (ctx) -> {

    };

    public Handler handleViewAllSpecificRequest = (ctx) -> {

    };

    public Handler handleUpdateReimbursementStatus = (ctx) -> {

    };

    public Handler handleDeleteReimbursement = (ctx) -> {

    };
}
