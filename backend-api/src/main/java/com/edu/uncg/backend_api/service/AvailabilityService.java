package com.edu.uncg.backend_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.uncg.backend_api.entity.Availability;
import com.edu.uncg.backend_api.repository.AvailabilityRepository;

@Service
public class AvailabilityService {

    @Autowired
    private AvailabilityRepository repo;

    public Availability save(Availability availability){
        return repo.save(availability);
    }

    public List<Availability> getByBabysitter(Long babysitterId){
        return repo.findByBabysitterId(babysitterId);
    }
}