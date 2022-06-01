create database subscribe;

create table SubscribedUser(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
);