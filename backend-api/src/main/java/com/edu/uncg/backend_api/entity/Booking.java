package com.edu.uncg.backend_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String babysitterName;
    private String startTime;
    private String endTime;
    private String date;
    private String status;
    private double totalCost;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;

   
    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public String getStartTime(){
        return startTime;
    }

    public void setStartTime(String startTime){
        this.startTime = startTime;
    }

    public String getDate(){
        return date;
    }

    public void setDate(String date){
        this.date = date;
    }

    public String getEndTime(){
        return endTime;
    }

    public void setEndTime(String endTime){
        this.endTime = endTime;
    }

    public double getTotalCost(){
        return totalCost;
    }

    public void setTotalCost(double totalCost){
        this.totalCost = totalCost;
    }

     public Parent getParent(){
        return parent;
    }

    public void setParent(Parent parent){
        this.parent = parent;
    }

    public Booking(){}
    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

     public String getBabysitterName(){
        return babysitterName;
    }

    public void setBabysitterName(String babysitterName){
        this.babysitterName = babysitterName;
    }
}



