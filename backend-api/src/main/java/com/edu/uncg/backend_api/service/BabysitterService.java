package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.edu.uncg.backend_api.entity.Babysitter;
import com.edu.uncg.backend_api.repository.BabysitterRepository;
import com.edu.uncg.backend_api.repository.AvailabilityRepository;
import com.edu.uncg.backend_api.repository.BookingRepository;
import com.edu.uncg.backend_api.repository.MessageRepository;
import com.edu.uncg.backend_api.repository.PaymentRepository;
import com.edu.uncg.backend_api.repository.ReviewRepository;

@Service
public class BabysitterService {

    @Autowired
    private BabysitterRepository babysitterRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Babysitter> getAll() {
        return babysitterRepository.findAll();
    }

    public Babysitter save(Babysitter babysitter) {
        return babysitterRepository.save(babysitter);
    }

    public Babysitter updateBabysitter(Long id, Babysitter updated) {
        Babysitter babysitter = babysitterRepository.findById(id).orElseThrow();

    babysitter.setName(updated.getName());
    babysitter.setEmail(updated.getEmail());
    babysitter.setPassword(updated.getPassword());
    babysitter.setPhoneNumber(updated.getPhoneNumber());
    babysitter.setHourlyRate(updated.getHourlyRate());
    babysitter.setRating(updated.getRating());
    babysitter.setVerifiedStatus(updated.isVerifiedStatus());

    babysitter.setBio(updated.getBio());
    babysitter.setAvailability(updated.getAvailability());

    return babysitterRepository.save(babysitter);
    }
    public void deleteBabysitter(Long id) {
        Babysitter babysitter = babysitterRepository.findById(id).orElseThrow();

        bookingRepository.findByBabysitterId(id).forEach(booking -> {
            paymentRepository.findByBookingId(booking.getId()).forEach(paymentRepository::delete);
            bookingRepository.delete(booking);
        });

        reviewRepository.findByBabysitter_Id(id).forEach(reviewRepository::delete);
        availabilityRepository.findByBabysitterId(id).forEach(availabilityRepository::delete);

        messageRepository.findBySenderIdOrReceiverId(id, id).forEach(messageRepository::delete);

        babysitterRepository.delete(babysitter);
    }
}