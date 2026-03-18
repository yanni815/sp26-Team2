package com.edu.uncg.backend_api.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "parents")
public class Parent extends User{
   private String address;
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
}
