package com.edu.uncg.backend_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;

    @OneToOne
    private Booking booking;

    private double amount;
    private String paymentStatus;
    private String paymentDate;

    public Long getPaymentID(){
        return paymentID;
    }

    public void setPaymentID(Long paymentID){
        this.paymentID = paymentID;
    }

    public Booking getBooking(){
        return booking;
    }

    public void setBooking(Booking booking){
        this.booking = booking;
    }

    public double getAmount(){
        return amount;
    }

    public void setAmount(double amount){
        this.amount = amount;
    }

     public String getPaymentStatus(){
        return paymentStatus;
    }

    public void setPaymentStatus(String payemntStatus){
        this.paymentStatus = payemntStatus;
    }

     public String getPaymentDate(){
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate){
        this.paymentDate = paymentDate;
    }
}
