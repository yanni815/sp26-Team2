package com.edu.uncg.backend_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


import com.edu.uncg.backend_api.entity.Review;
import com.edu.uncg.backend_api.service.ReviewSerivce;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewSerivce reviewService;

    @PostMapping
    public Review createReview(@RequestBody Review review){
        return reviewService.save(review);
    }

    @GetMapping
    public List<Review> getAllReviews(){
        return reviewService.getAll();
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review review){
        return reviewService.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id){
        reviewService.deleteReview(id);
    }
}