-- drop database if exists group39;
-- create database group39;
-- use group39;

-- datetime is of the format: YYYY-MM-DD HH:MI:SS

drop table if exists user;
create table user (
	username varchar(24) NOT NULL,
	password varchar(256) NOT NULL, 
	-- we have to run this through hash function, not string type
	email varchar(50) NOT NULL,
	user_type SET('Visitor', 'Staff', 'Admin') NOT NULL, 
	PRIMARY KEY (username),
	CHECK (password >= 8)
);

drop table if exists admin;
create table admin (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists visitor;
create table visitor (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists staff;
create table staff (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists animal;
create table animal (
	name varchar(40) NOT NULL,
	species varchar(40) NOT NULL,
	type SET('Mammal', 'Bird', 'Amphibian', 'Reptile', 'Fish', 'Invertebrate'),
	age smallint,
	-- number of months
	exhibit varchar(40) NOT NULL,
	PRIMARY KEY (name, species),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE
	-- Lan fix
);

-- Lan: Cannot create table "show" because it is a reserved word, changed to "shows"
drop table if exists shows;
create table shows (
	name varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	host varchar(24) NOT NULL,
	exhibit varchar(40) NOT NULL,
	PRIMARY KEY (name, date_time),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE,
	-- Lan fix
	CONSTRAINT FOREIGN KEY (host) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists exhibit;
create table exhibit (
	name varchar(40) NOT NULL,
	water_feature boolean NOT NULL,
	size smallint NOT NULL,
	PRIMARY KEY (name)
);

drop table if exists animal_care;
create table animal_care (
	animal varchar(40) NOT NULL,
	species varchar(40) NOT NULL,
	staff_member varchar(24) NOT NULL,
	date_time datetime NOT NULL,
	text_care text NOT NULL,
	PRIMARY KEY (animal, species, staff_member, date_time), 
	CONSTRAINT FOREIGN KEY (animal) REFERENCES animal(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (species) REFERENCES animal(species) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (staff_member) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists visit_show;
create table visit_show (
	show_name varchar(40) NOT NULL,
	date_time datetime NOT NULL, 
	visitor varchar(24) NOT NULL,
	PRIMARY KEY (show_name, date_time, visitor),
	CONSTRAINT FOREIGN KEY (show_name) REFERENCES shows(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (date_time) REFERENCES shows(date_time) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (visitor) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table if exists visit_exhibit;
create table visit_exhibit (
	exhibit varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	visitor varchar(24) NOT NULL,
	PRIMARY KEY (exhibit, date_time, visitor),
	-- Lan fix
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (visitor) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

