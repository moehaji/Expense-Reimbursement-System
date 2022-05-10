grant all privileges on database postgres to dbuser;

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
	('bill76', 'password', 'Bill', 'Smith', 'billsmilt@mail.com', 1),
	('mohamed96', 'password', 'Mohamed', 'Abdulla', 'mohamed@mail.com', 1),
	('john123', 'password', 'John', 'Smith', 'john@mail.com', 1),
	('bayode123', 'password', 'Bayode', 'Ol', 'bayode@mail.com', 2),
	('mark3454', 'New Pass', 'Mark', 'Smith', 'mark@mail.com', 1);

insert into reimbursement_status (status) values 
	('PENDING'), -- 1
	('APPROVED'), -- 2
	('DENIED'); -- 3

insert into reimbursement_type (type) values 
	('LODGING'), -- 1
	('TRAVEL'), -- 2
	('FOOD'), -- 3
	('OTHER'); -- 4

insert into reimbursement (amount, submitted_date, resolved_date, description, reimbursement_author, 
			reimbursement_resolver, reimbursement_status, reimbursement_type) values
	(200, '2022-05-02', '2022-05-06', 'Hotel business trip', 1, 4, 2, 1),
	(10, '2022-05-02', '2022-05-06', 'Hotel business trip', 2, 4, 1, 1),
	(950, '2022-05-02', '2022-05-06', 'Hotel business trip', 4, 4, 3, 1),
	(5, '2022-05-02', '2022-05-06', 'Hotel business trip', 2, 4, 2, 1);
	
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
