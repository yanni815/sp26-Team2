package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.edu.uncg.backend_api.entity.Booking;
import com.edu.uncg.backend_api.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }


    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElseThrow();
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        Booking booking = bookingRepository.findById(id).orElseThrow();

        booking.setDate(updatedBooking.getDate());
        booking.setStartTime(updatedBooking.getStartTime());
        booking.setEndTime(updatedBooking.getEndTime());
        booking.setTotalCost(updatedBooking.getTotalCost());
        booking.setParent(updatedBooking.getParent());
        booking.setStatus(updatedBooking.getStatus());
         booking.setBabysitter(updatedBooking.getBabysitter());

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        Booking b = bookingRepository.findById(id).orElseThrow();
        b.setStatus("CANCELLED");
        bookingRepository.save(b);
    }

    public Booking acceptBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus("ACCEPTED");
        return bookingRepository.save(booking);
    }

    public Booking declineBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus("DECLINED");
        return bookingRepository.save(booking);
    }

    public List<Booking> getByBabysitter(Long id) {
        return bookingRepository.findByBabysitterId(id);
    }
}