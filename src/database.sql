drop database express_basic;

create database express_basic;

use express_basic;

create table accounts(
	id int primary key auto_increment,
	username varchar(255) not null unique,
	password varchar(255) not null,
	fullName varchar(255) not null,
	role enum('customer', 'admin') not null
);

create table customers(
	id int primary key auto_increment,
	accountId int not null unique,
	address varchar(255),
	birthday datetime default current_timestamp
);

create table admins(
	id int primary key auto_increment,
	accountId int not null unique
);

create table products(
	id int primary key auto_increment,
	name varchar(255) not null,
	price varchar(255) not null,
	imageUrl varchar(255)
);

create table categories(
	id int primary key auto_increment,
	name varchar(255) not null
);

create table collections(
	id int primary key auto_increment,
	name varchar(255) not null,
	createdDate datetime default current_timestamp,
	expiredDate datetime default current_timestamp
);

create table carts(
	id int primary key auto_increment,
	accountId int not null
);

create table orders(
	id int primary key auto_increment,
	accountId int not null,
	shippingFee int default 0,
	createdDate datetime default current_timestamp,
	modifiedDate datetime on update current_timestamp
);

create table invoices(
	id int primary key auto_increment,
	orderId int not null,
	totalAmount int not null
);

create table product_category(
	productId int not null,
	categoryId int not null,
	primary key (productId, categoryId)
);

create table product_collection(
	productId int not null,
	collectionId int not null,
	primary key (productId, collectionId)
);

create table product_cart(
	productId int not null,
	cartId int not null,
	primary key (productId, cartId)
);

create table product_order(
	productId int not null,
	orderId int not null,
	primary key (productId, orderId)
);

alter table customers add foreign key (accountId) references accounts(id);

alter table admins add foreign key (accountId) references accounts(id);

alter table product_category add foreign key (productId) references products(id);
alter table product_category add foreign key (categoryId) references categories(id);

alter table product_collection add foreign key (productId) references products(id);
alter table product_collection add foreign key (collectionId) references collections(id);

alter table carts add foreign key (accountId) references accounts(id);

alter table product_cart add foreign key (productId) references products(id);
alter table product_cart add foreign key (cartId) references carts(id);

alter table orders add foreign key (accountId) references accounts(id);

alter table product_order add foreign key (productId) references products(id);
alter table product_order add foreign key (orderId) references orders(id);

alter table invoices add foreign key (orderId) references orders(id);
