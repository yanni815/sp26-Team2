package com.edu.uncg.backend_api.repository;

import com.edu.uncg.backend_api.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBabysitter_Id(Long babysitterId);
}