package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.uncg.backend_api.entity.Review;
import java.util.List;
import com.edu.uncg.backend_api.repository.ReviewRepository;

@Service
public class ReviewSerivce {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review save(Review review){
        return reviewRepository.save(review);
    }

    public List<Review> getAll(){
        return reviewRepository.findAll();

    }

    public Review deleteReview(Long id){
    Review review = reviewRepository.findById(id).orElseThrow();
    return reviewRepository.save(review);
}
}
