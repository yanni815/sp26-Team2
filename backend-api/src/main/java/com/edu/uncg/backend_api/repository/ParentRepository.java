package com.edu.uncg.backend_api.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {

    
}