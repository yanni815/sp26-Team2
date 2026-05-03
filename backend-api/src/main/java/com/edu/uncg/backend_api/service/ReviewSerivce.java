package com.edu.uncg.backend_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.uncg.backend_api.entity.Review;
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

    public void deleteReview(Long id){
    Review review = reviewRepository.findById(id).orElseThrow();
    reviewRepository.delete(review);
    }
    public Review updateReview(Long id, Review updated){
    Review review = reviewRepository.findById(id).orElseThrow();

    review.setRating(updated.getRating());
    review.setComment(updated.getComment());
    review.setBabysitter(updated.getBabysitter());
    review.setParent(updated.getParent());

    return reviewRepository.save(review);
        }
    }

