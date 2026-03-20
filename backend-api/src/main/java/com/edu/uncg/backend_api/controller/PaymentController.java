package com.edu.uncg.backend_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edu.uncg.backend_api.service.PaymentService;
import java.util.List;
import com.edu.uncg.backend_api.entity.Payment;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment makePayment(@RequestBody Payment payment){
        return paymentService.makePayment(payment);
    }

    @GetMapping
    public List<Payment> getAllPayment(){
        return paymentService.getAll();

    }

    @PutMapping
    public Payment updatePayment(@PathVariable Long id, @RequestBody Payment payment){
        return paymentService.updatePayment(id, payment);
    }
}
