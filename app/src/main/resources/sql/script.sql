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
	submitted_date date,
	resolved_date date,
	description varchar(256),
	reimbursement_author int references users(user_id),
	reimbursement_resolver int references users(user_id),
	reimbursement_status int references reimbursement_status(status_id),
	reimbursement_type int references reimbursement_type(type_id)
);

insert into user_roles(role) values
	('Employee'),
	('Manager');

insert into users(username, password, first_name, last_name, email, role) values
	('mohamed96', 'password', 'Mohamed', 'Abdulla', 'mohamed@mail.com', 1),
	('john123', 'password', 'John', 'Smith', 'john@mail.com', 1),
	('bayode123', 'password', 'Bayode', 'Olaoye', 'bayode@mail.com', 2);

insert into reimbursement_status (status) values
	('Pending');

insert into reimbursement_type (type) values
	('TRAVEL');

insert into reimbursement (amount, submitted_date, resolved_date, description, reimbursement_author, reimbursement_resolver, reimbursement_status, reimbursement_type) values
	(500, '2022-05-03', '2022-05-06', 'Hotel business trip', 2, 2, 1, 1);

-- SELECT
select * from user_roles;
select * from users;
select * from reimbursement_status;
select * from reimbursement_type;
select * from reimbursement;

--DROP
drop table user_roles;
drop table users;
drop table reimbursement_status;
drop table reimbursement_type;
drop table reimbursement;