package com.edu.uncg.backend_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.edu.uncg.backend_api.entity.Availability;
import com.edu.uncg.backend_api.service.AvailabilityService;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {

    @Autowired
    private AvailabilityService service;

    @PostMapping
    public Availability create(@RequestBody Availability availability){
        return service.save(availability);
    }

    @GetMapping("/babysitter/{id}")
    public List<Availability> getByBabysitter(@PathVariable Long id){
        return service.getByBabysitter(id);
    }
}