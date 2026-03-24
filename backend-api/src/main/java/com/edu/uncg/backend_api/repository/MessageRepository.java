package com.edu.uncg.backend_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.uncg.backend_api.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    

    
}
