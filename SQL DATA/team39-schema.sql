-- drop database if exists group39;
-- create database group39;
-- use group39;

-- datetime is of the format: YYYY-MM-DD HH:MI:SS

drop table if exists visit_exhibit;
drop table if exists visit_show;
drop table if exists animal_care;
drop table if exists animal;
drop table if exists shows;
drop table if exists exhibit;
drop table if exists admin;
drop table if exists visitor;
drop table if exists staff;
drop table if exists user;

create table user (
	username varchar(24) NOT NULL,
	password varchar(256) NOT NULL,
	email varchar(50) NOT NULL,
	user_type SET('Visitor', 'Staff', 'Admin') NOT NULL, 
	PRIMARY KEY (username),
	CHECK (password >= 8)
) ENGINE=InnoDB;

create table admin (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

create table visitor (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

create table staff (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

create table exhibit (
	name varchar(40) NOT NULL,
	water_feature boolean NOT NULL,
	size smallint NOT NULL,
	PRIMARY KEY (name)
) ENGINE=InnoDB;

create table shows (
	name varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	host varchar(24) NOT NULL,
	exhibit varchar(40) NOT NULL,
	PRIMARY KEY (name, date_time),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (host) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

create table animal (
	name varchar(40) NOT NULL,
	species varchar(40) NOT NULL,
	type SET('Mammal', 'Bird', 'Amphibian', 'Reptile', 'Fish', 'Invertebrate') NOT NULL,
	age smallint NOT NULL,
	exhibit varchar(40) NOT NULL,
	PRIMARY KEY (name, species),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

create table animal_care (
	animal varchar(40) NOT NULL,
	species varchar(40) NOT NULL,
	staff_member varchar(24) NOT NULL,
	date_time datetime NOT NULL,
	text_care text NOT NULL,
	PRIMARY KEY (animal, species, staff_member, date_time), 
	CONSTRAINT FOREIGN KEY (animal, species) REFERENCES animal(name, species) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (staff_member) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

drop table if exists visit_show;
create table visit_show (
	show_name varchar(40) NOT NULL,
	date_time datetime NOT NULL, 
	visitor varchar(24) NOT NULL,
	CONSTRAINT FOREIGN KEY (show_name, date_time) REFERENCES shows(name, date_time) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (visitor) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (show_name, date_time, visitor)
) ENGINE=InnoDB;

create table visit_exhibit (
	exhibit varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	visitor varchar(24) NOT NULL,
	PRIMARY KEY (exhibit, date_time, visitor),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (visitor) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

