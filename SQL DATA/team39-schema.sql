drop database if exists team39;
create database team39;
use team39;

# datetime is of the format: YYYY-MM-DD HH:MI:SS

create table user (
	username varchar(24) NOT NULL,
	password NOT NULL, # we have to run this through hash function, not string type
	email varchar(50) NOT NULL,
	user_type SET('Visitor', 'Staff') NOT NULL,
	PRIMARY KEY (username),
	CHECK (password >= 8)
);

create table admin (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

create table visitor (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

create table staff (
	username varchar(24) NOT NULL,
	PRIMARY KEY (username),
	CONSTRAINT FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

create table animal (
	name varchar(40) NOT NULL,
	species varchar(40) NOT NULL,
	type SET('Mammal', 'Bird', 'Amphibian', 'Reptile', 'Fish', 'Invertebrate') NOT NULL,
	age smallint NOT NULL, # number of months
	exhibit varchar(40) NOT NULL,
	PRIMARY KEY (name, species),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(exhibit) ON DELETE CASCADE ON UPDATE CASCADE
);

create table show (
	name varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	host varchar(24) NOT NULL,
	exhibit varchar(40) NOT NULL,
	PRIMARY KEY (name, date_time),
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(exhibit) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (host) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

create table exhibit (
	name varchar(40) NOT NULL,
	water_feature boolean NOT NULL,
	size smallint NOT NULL,
	PRIMARY KEY (name)
);

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

create table visit_show (
	show_name varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	visitor varchar(24) NOT NULL,
	PRIMARY KEY (show_name, date_time, visitor),
	CONSTRAINT FOREIGN KEY (show_name) REFERENCES show(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (date_time) REFERENCES show(date_time) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (visitor) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

create table visit_exhibit (
	exhibit varchar(40) NOT NULL,
	date_time datetime NOT NULL,
	visitor varchar(24) NOT NULL,
	PRIMARY KEY (exhibit, date_time, visitor)
	CONSTRAINT FOREIGN KEY (exhibit) REFERENCES exhibit(name) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FOREIGN KEY (visitor) REFERENCES user(username) ON DELETE CASCADE ON UPDATE CASCADE
);

