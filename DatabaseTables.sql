create table user_roles (
	role_id int primary key generated always as identity,
	role varchar(64)
);

create table users (
	user_id int primary key generated always as identity,
	username varchar(128) unique,
	password varchar(256),
	first_name varchar(64),
	last_name varchar(64),
	email varchar(128) unique,
	role int references user_roles(role_id)
);

create table reimbursement_status (
	status_id int primary key generated always as identity,
	status varchar(128)
);

create table reimbursement_type (
	type_id int primary key generated always as identity,
	type varchar(128)
);

create table reimbursement (
	reimbursement_id int primary key generated always as identity,
	amount numeric(11, 2),
	submitted_date varchar(128),
	resolved_date varchar(128),
	description varchar(256),
	reimbursement_author int references users(user_id),
	reimbursement_resolver int references users(user_id),
	reimbursement_status int references reimbursement_status(status_id),
	reimbursement_type int references reimbursement_type(type_id)
);

insert into user_roles(role) values
	('EMPLOYEE'), -- 1
	('MANAGER'); -- 2

insert into users(username, password, first_name, last_name, email, role) values
	('bill769', 'password', 'Bill', 'Smith', 'bill@mail.com', 1),
	('john123', 'password', 'John', 'Ryan', 'john@mail.com', 1),
	('mark354', 'password', 'Mark', 'Anthony', 'mark@mail.com', 1),
	('ezekiel79', 'password', 'Ezekiel', 'Monk', 'ezekiel@mail.com', 1),
	('grady62', 'password', 'Grady', 'Merritt', 'grady@mail.com', 2);

insert into reimbursement_status (status) values
	('PENDING'), -- 1
	('APPROVED'), -- 2
	('DENIED'); -- 3

insert into reimbursement_type (type) values
	('LODGING'), -- 1
	('TRAVEL'), -- 2
	('FOOD'), -- 3
	('OTHER'); -- 4

-- Resolved Reimbursements
insert into reimbursement (amount, submitted_date, resolved_date, description, reimbursement_author,
			reimbursement_resolver, reimbursement_status, reimbursement_type) values
	(237, '2019-01-04', '2019-01-06', 'Holiday trip', 1, 5, 2, 1),
	(55, '2020-02-13', '2020-02-017', 'Other', 1, 5, 3, 4),
	(20, '2022-04-02', '2022-04-06', 'Lunch food', 1, 5, 2, 3),
	(400, '2018-01-05', '2018-01-14', 'Would like a vacation', 2, 5, 2, 2),
	(5, '2021-10-23', '2021-11-01', 'Would like to get a food reimbursement', 2, 5, 2, 3),
	(75, '2022-03-19', '2022-03-19', 'Visiting friends', 2, 5, 2, 4),
	(100, '2019-12-10', '2019-12-15', 'I want Christmas off', 3, 5, 3, 4),
	(230, '2020-11-31', '2020-12-03', 'Need a reimbursement, going on a trip', 3, 5, 2, 2),
	(500, '2021-05-21', '2021-05-26', 'Business trip', 3, 5, 2, 1),
	(15, '2020-03-02', '2020-03-13', 'Lunch with the batch', 4, 5, 2, 3),
	(500, '2021-12-04', '2021-12-12', 'Holiday trip for christmas', 4, 5, 3, 2);

-- Pending Reimbursements
insert into reimbursement (amount, submitted_date, resolved_date, description, reimbursement_author,
			reimbursement_resolver, reimbursement_status, reimbursement_type) values
	(100, '2022-05-16', null, 'I need a reimbursement to cover my hotel expenses', 1, null, 1, 1),
	(85, '2022-05-17', null, 'Cash reimbursement', 2, null, 1, 4),
	(20, '2022-05-20', null, 'I would like a reimbursement for Victoria Day holiday', 4, null, 1, 4);

-- SELECT
select * from reimbursement;
select * from users;
select * from reimbursement_type;
select * from reimbursement_status;
select * from user_roles;

--DROP
drop table reimbursement;
drop table reimbursement_type;
drop table reimbursement_status;
drop table users;
drop table user_roles;

-- TRUNCATE 
truncate reimbursement;
truncate reimbursement_type;
truncate reimbursement_status;
truncate users;
truncate user_roles;