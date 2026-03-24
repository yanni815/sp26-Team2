package com.edu.uncg.backend_api.repository;
import com.edu.uncg.backend_api.entity.Babysitter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BabysitterRepository extends JpaRepository<Babysitter, Long> {
    
}
