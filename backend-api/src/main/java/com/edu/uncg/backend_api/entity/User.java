package com.edu.uncg.backend_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phoneNumber;

    public String getname(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getemail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getepassword(){
        return password;
    }

    public void Password(String password){
        this.password = password;
    }

    public String getphoneNumber(){
        return phoneNumber;
    }

    public void PhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }
}
