package com.edu.uncg.backend_api.entity;

import jakarta.persistence.Entity;

@Entity
public class Babysitter extends User {
    private double hourlyRate;
    private double rating;
    private boolean verifiedStatus;

    public double getHourlyRate(){
        return hourlyRate;
    }

    public void setHourlyRate(double hourlyRate){
        this.hourlyRate = hourlyRate;
    }

     public double getRating(){
        return rating;
    }

     public void setRating(double rating){
        this.rating = rating;
    }

    public boolean isVerifiedStatus() {
        return verifiedStatus;
    }

    public void setVerifiedStatus(boolean verifiedStatus) {
        this.verifiedStatus = verifiedStatus;
    }


}
