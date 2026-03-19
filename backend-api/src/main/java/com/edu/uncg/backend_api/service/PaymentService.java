package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.uncg.backend_api.entity.Payment;
import java.util.List;
import com.edu.uncg.backend_api.repository.PaymentRepository;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Payment makePayment(Payment payment){
        payment.setPaymentStatus("PAID");
        return paymentRepository.save(payment);

    }

    public List<Payment> getAll(){
        return paymentRepository.findAll();
    }
}
