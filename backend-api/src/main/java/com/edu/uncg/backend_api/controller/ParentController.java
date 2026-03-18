package com.edu.uncg.backend_api.controller;
import com.edu.uncg.backend_api.entity.Parent;
import com.edu.uncg.backend_api.service.ParentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/parents")
public class ParentController {
    @Autowired
    private ParentService service;

    @PostMapping
    public Parent create(@RequestBody Parent parent){
        return service.createParent(parent);
    }

    @GetMapping
    public List<Parent> getAll(){
        return service.getallParents();
    }

    @PutMapping("/{id}")
    public Parent update(@PathVariable Long id, @RequestBody Parent parent){
        return service.updateParent(id, parent);
    }

   
}
