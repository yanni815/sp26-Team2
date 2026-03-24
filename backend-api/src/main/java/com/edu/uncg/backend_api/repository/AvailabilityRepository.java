package com.edu.uncg.backend_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.uncg.backend_api.entity.Availability;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByBabysitterId(Long babysitterId);
}