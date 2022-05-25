# Expense Reimbursement System

## Executive Summary

The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history for all employees in the company. Finance managers are authorized to approve and deny requests for expense reimbursement.

## Technical Requirements

-   The application employs the DAO design pattern, and is separated into different layers: (Models, DAO, Service, Controllers)
-   The back-end system uses JDBC to talk to the Database
-   The java backend uses Javalin to create the webserver, and process HTTP requests from the client
-   The front-end view is created using ReactJS
-   Use Log4J and JUnit are used for logging and testing. At least 75% code coverage on service methods

## User Stories

As an employee I can:

-   Login
-   Logout
-   View the employee home page
-   Submit a reimbursement request
-   View pending reimbursement requests
-   View resolved reimbursement requests
-   View my account information
-   Update account information

As a manager I can:

-   Login
-   Logout
-   View the manager home page
-   Approve/Deny pending reimbursement requests
-   View all pending requests of all employees
-   View all resolved requests of all employees
-   View reimbursement requests of a specific employee
-   View all employees

## Reimbursement Types

Employees must select the type of reimbursement as: LODGING, TRAVEL, FOOD, or OTHER.
