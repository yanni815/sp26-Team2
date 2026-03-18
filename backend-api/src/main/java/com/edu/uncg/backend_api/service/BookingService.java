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

        booking.setDate(updatedBooking.getdate());
        booking.setStartTime(updatedBooking.getstartTime());
        booking.setEndTime(updatedBooking.getendTime());
        booking.setStatus(updatedBooking.getStatus());

        return bookingRepository.save(booking);
    }

    public Booking deleteBooking(Long Id){
        Booking b = bookingRepository.findById(Id).orElseThrow();
        b.setStatus("CANCLED");
        return bookingRepository.save(b);
    }


}
