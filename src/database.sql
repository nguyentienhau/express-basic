drop database express_basic;

create database express_basic;

use express_basic;

create table account (
	id int primary key auto_increment,
	username varchar(255) not null unique,
	password varchar(255) not null,
	full_name varchar(255) not null,
	role enum('customer', 'admin') not null,
	created_date datetime default current_timestamp,
	modified_date datetime default current_timestamp on update current_timestamp
);

create table customer (
	id int primary key auto_increment,
	account_id int not null unique,
	address varchar(255),
	birthday datetime default current_timestamp
);

create table admin (
	id int primary key auto_increment,
	account_id int not null unique
);

create table product (
	id int primary key auto_increment,
	name varchar(255) not null,
	price varchar(255) not null,
	image_url varchar(255),
	created_date datetime default current_timestamp,
	modified_date datetime default current_timestamp on update current_timestamp
);

create table category (
	id int primary key auto_increment,
	name varchar(255) not null,
	created_date datetime default current_timestamp,
	modified_date datetime default current_timestamp on update current_timestamp
);

create table collection (
	id int primary key auto_increment,
	name varchar(255) not null,
	created_date datetime default current_timestamp,
	modified_date datetime default current_timestamp on update current_timestamp,
	expired_date datetime default current_timestamp
);

create table cart (
	id int primary key auto_increment,
	account_id int not null,
	created_date datetime default current_timestamp,
	modified_date datetime default current_timestamp on update current_timestamp
);

create table order (
	id int primary key auto_increment,
	account_id int not null,
	total_amount int not null,
	shipping_fee int default 0,
	created_date datetime default current_timestamp,
	modified_date datetime default current_timestamp on update current_timestamp
);

create table product_category (
	product_id int not null,
	category_id int not null,
	primary key (product_id, category_id)
);

create table product_collection (
	product_id int not null,
	collection_id int not null,
	primary key (product_id, collection_id)
);

create table product_cart (
	product_id int not null,
	cart_id int not null,
	quantity int default 1,
	primary key (product_id, cart_id)
);

create table product_order (
	product_id int not null,
	order_id int not null,
	quantity int default 1,
	primary key (product_id, order_id)
);

alter table customer add foreign key (account_id) references account(id);

alter table admin add foreign key (account_id) references account(id);

alter table product_category add foreign key (product_id) references product(id);
alter table product_category add foreign key (category_id) references category(id);

alter table product_collection add foreign key (product_id) references product(id);
alter table product_collection add foreign key (collection_id) references collection(id);

alter table cart add foreign key (account_id) references account(id);

alter table product_cart add foreign key (product_id) references product(id);
alter table product_cart add foreign key (cart_id) references cart(id);

alter table order add foreign key (account_id) references account(id);

alter table product_order add foreign key (product_id) references product(id);
alter table product_order add foreign key (order_id) references order(id);
