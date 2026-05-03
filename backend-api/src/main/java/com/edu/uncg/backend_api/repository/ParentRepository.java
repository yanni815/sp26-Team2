package com.edu.uncg.backend_api.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.edu.uncg.backend_api.entity.Parent;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long>{

    Optional<Parent> findByEmail(String email);
    
}