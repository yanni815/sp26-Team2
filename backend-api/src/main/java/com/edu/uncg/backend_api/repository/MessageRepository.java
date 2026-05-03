package com.edu.uncg.backend_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.uncg.backend_api.entity.Message;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdOrReceiverId(Long senderId, Long receiverId);
}