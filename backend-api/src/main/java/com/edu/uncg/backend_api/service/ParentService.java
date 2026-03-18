package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.edu.uncg.backend_api.repository.ParentRepository;
import com.edu.uncg.backend_api.entity.Parent;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParentService {
    @Autowired
    private ParentRepository repo;

    public Parent createParent(Parent parent){
        return repo.save(parent);
    }

    public List<Parent> getallParents(){
        return repo.findAll();
    }

    public Parent updateParent(Long id, Parent updatedParent) {
        Parent p = repo.findById(id).orElseThrow();
        p.setName(updatedParent.getName());
        p.setName(updatedParent.getEmail());
        p.setName(updatedParent.getPhone());
        return repo.save(p);
    }
}
