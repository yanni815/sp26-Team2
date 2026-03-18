package com.edu.uncg.backend_api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.uncg.backend_api.entity.Booking;


import java.util.List;
@Repository 
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByParentId(Long parentId);
}