package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.edu.uncg.backend_api.repository.BabysitterRepository;
import com.edu.uncg.backend_api.entity.Babysitter;

@Service
public class BabysitterService {
    @Autowired
    private BabysitterRepository babysitterRepository;

    public List<Babysitter> getAll(){
        return babysitterRepository.findAll();
    }

    public Babysitter save(Babysitter babysitter){
        return babysitterRepository.save(babysitter);
    }
}
