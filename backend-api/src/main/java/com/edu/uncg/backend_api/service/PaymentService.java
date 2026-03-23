package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.uncg.backend_api.entity.Payment;
import java.util.List;

import com.edu.uncg.backend_api.entity.Booking;
import com.edu.uncg.backend_api.repository.BookingRepository;
import com.edu.uncg.backend_api.repository.PaymentRepository;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public Payment makePayment(Payment payment){
       Long bookingId = payment.getBooking().getId();
       Booking booking = bookingRepository.findById(bookingId).orElseThrow();
       payment.setBooking(booking);
       return paymentRepository.save(payment);
    }

    public List<Payment> getAll(){
        return paymentRepository.findAll();
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
    Payment payment = paymentRepository.findById(id).orElseThrow();

    payment.setAmount(updatedPayment.getAmount());
    payment.setPaymentDate(updatedPayment.getPaymentDate());
    payment.setPaymentStatus(updatedPayment.getPaymentStatus());

    payment.setBooking(updatedPayment.getBooking());

    return paymentRepository.save(payment);
}

    public Payment deletePayment(Long id){
    Payment payment = paymentRepository.findById(id).orElseThrow();
    payment.setPaymentStatus("DELETED");
    return paymentRepository.save(payment);
}

}
