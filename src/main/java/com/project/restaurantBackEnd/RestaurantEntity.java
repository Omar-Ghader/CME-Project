package com.project.restaurantBackEnd;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name="restaurants")
public class RestaurantEntity {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Integer Id;
@Column(name="name")
private String name;
@Column(name="type")
private String type;
public RestaurantEntity() {}
public RestaurantEntity(String name, String type) {
	super();
	this.name = name;
	this.type = type;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}

@Override
public String toString() {
	return "RestaurantEntity [Id=" + Id + ", name=" + name + ", type=" + type + "]";
}
}