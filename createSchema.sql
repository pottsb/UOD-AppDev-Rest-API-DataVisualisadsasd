CREATE DATABASE AppDev01;
USE AppDev01;

create table data(
ID int (12) not null,
KIDSDRIVE int (1),
DOB text,
AGE int (2),
HOMEKIDS int (1),
YOJ int (2),
INCOME int (6),
PARENT ENUM('Yes', 'No'),
HOME_VAL int (10),
MSTATUS ENUM('Yes', 'No'),
GENDER ENUM('M', 'F'),
EDUCATION ENUM ('High School', 'PhD', 'Bachelors', 'Masters'),
OCCUPATION varchar (50),
TRAVTIME int (2),
CAR_USE ENUM('Private', 'Commercial'),
BLUEBOOK int (10),
TIF int (2),
CAR_TYPE ENUM('Pickup', 'Minivan', 'SUV', 'Sports Car', 'Van', 'Panel Truck'),
RED_CAR ENUM('Yes', 'No'),
OLDCLAIM int (10),
CLM_FREQ int (1),
REVOKED VARCHAR(4),
MVR_PTS int (1),
CLM_AMT int (10),
CAR_AGE int (2),
CLAIM_FLAG int (1),
URBANICITY ENUM('Highly Urban/ Urban', 'Highly Rural/ Rural'),

primary key (ID)
);