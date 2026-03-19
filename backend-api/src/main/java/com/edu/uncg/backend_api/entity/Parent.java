package com.edu.uncg.backend_api.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;



@Entity
@Table(name = "parents")
public class Parent extends User{
   private String address;
   private String name;
   private int numberOfChildren;

   public String getAddress(){
    return address;
   }

   public void setAddress(String address){
    this.address = address;
   }

   public int getNumberOfChildren(){
    return numberOfChildren;
   }

   public void setNumberOfChildren(int numberOfChildren){
    this.numberOfChildren = numberOfChildren;
   }

   public String getName(){
      return name;
   }

   public void setName(String name){
      this.name = name;
   }
}
