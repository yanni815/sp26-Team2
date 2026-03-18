package com.edu.uncg.backend_api.entity;

import jakarta.annotation.Generated;
import jakarta.persistence.Id;

@Entity
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
}
