package com.edu.uncg.backend_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.uncg.backend_api.entity.Payment;
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
}
