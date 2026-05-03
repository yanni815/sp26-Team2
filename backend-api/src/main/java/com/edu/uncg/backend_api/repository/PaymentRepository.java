package com.edu.uncg.backend_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.uncg.backend_api.entity.Payment;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByBookingId(Long bookingId);
}