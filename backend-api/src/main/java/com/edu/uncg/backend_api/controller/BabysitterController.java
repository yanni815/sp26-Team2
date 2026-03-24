package com.edu.uncg.backend_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.edu.uncg.backend_api.service.BabysitterService;
import com.edu.uncg.backend_api.entity.Babysitter;

@RestController
@RequestMapping("/babysitters")
public class BabysitterController {
    @Autowired
    private BabysitterService babysitterService;

    @GetMapping
    public List<Babysitter> getAllBabysitters(){
        return babysitterService.getAll();
    }

    @PostMapping
    public Babysitter createBabysitter(@RequestBody Babysitter babysitter){
        return babysitterService.save(babysitter);
    }
}
