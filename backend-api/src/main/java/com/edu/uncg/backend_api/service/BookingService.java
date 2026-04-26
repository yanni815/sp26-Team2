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

   

    public Booking createBooking(Booking booking){
        booking.setStatus("CREATED");
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
        booking.setStatus(updatedBooking.getStatus());
        booking.setTotalCost(updatedBooking.getTotalCost());
        booking.setParent(updatedBooking.getParent());
        

        return bookingRepository.save(booking);
    }

    public Booking deleteBooking(Long Id){
        Booking b = bookingRepository.findById(Id).orElseThrow();
        b.setStatus("CANCELLED");
        return bookingRepository.save(b);
    }


}
