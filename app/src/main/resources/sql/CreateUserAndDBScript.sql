/*
 * All of these should be run on the super database aka postgres
 * Create the user with a specified password and username
 */
create user dbuser with password 'password';

-- Create the database
create database reimbursementdb;

-- Give the user we created above, full access to the database
grant all privileges on database reimbursementdb to dbuser;