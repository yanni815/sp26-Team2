package com.edu.uncg.backend_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    private ReviewSerivce reviewSerivce;

    @PostMapping
    public Review createReview(@RequestBody Review review){
        return reviewSerivce.save(review);

    }

    @GetMapping
    public List<Review> getallReviews(){
        return reviewSerivce.getAll();

    }

}
