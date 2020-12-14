CREATE TABLE public.userdonation (
	id uuid NOT NULL,
	"name" varchar(100) NULL,
	email varchar(100) NULL,
	"password" varchar(100) NULL,
	date_of_birth varchar(100) NULL,
	type_user varchar(100) NULL,
	cep varchar(100) NULL,
	address varchar(100) NULL,
	"number" varchar(100) NULL,
	complement varchar(100) NULL,
	city varchar(100) NULL,
	uf varchar(2) NULL,
	code varchar NULL,
	CONSTRAINT unique_email UNIQUE (email),
	CONSTRAINT userdonation_pkey PRIMARY KEY (id)
);

create table category(
	id uuid primary key,
	name varchar(100)
);

CREATE TABLE public.donation (
	id uuid NOT NULL,
	"name" varchar(100) NULL,
	donor_id uuid NOT null,
	recipient_id uuid  null,
	status varchar(100) NULL,
	equipment_description varchar(100) NULL,
	interested_student uuid NULL,
	equipment_delivery date NULL,
	category varchar(100) NULL,
	allow_withdrawal_my_address boolean NULL,
	creation_date date,
	FOREIGN KEY (donor_id) REFERENCES userdonation (id),
	FOREIGN KEY (recipient_id) REFERENCES userdonation (id),
	FOREIGN KEY (interested_student) REFERENCES userdonation (id),
	CONSTRAINT id PRIMARY KEY (id)
);