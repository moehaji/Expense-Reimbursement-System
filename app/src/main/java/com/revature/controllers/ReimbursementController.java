package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    };

    public Handler handleEmployeeViewPendingReimbursements = (ctx) -> {

    };

    public Handler handleEmployeeViewResolvedReimbursements = (ctx) -> {

    };

    public Handler handleManagerViewAllPendingReimbursements = (ctx) -> {

    };

    public Handler handleManagerViewAllResolvedReimbursements = (ctx) -> {

    };

    public Handler handleManagerViewSpecificEmployeeReimbursements = (ctx) -> {

    };

    public Handler handleUpdateReimbursementStatus = (ctx) -> {

    };

    public Handler handleDeleteReimbursement = (ctx) -> {

    };

    public Handler handleApproveReimbursement = (ctx) -> {

    };

    public Handler handleDenyReimbursement = (ctx) -> {

    };
}
