package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.edu.uncg.backend_api.repository.ParentRepository;
import com.edu.uncg.backend_api.entity.Parent;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParentService {
    @Autowired
    private ParentRepository parentRepository;

    public Parent createParent(Parent parent){
        return parentRepository.save(parent);
    }

    public List<Parent> getallParents(){
        return parentRepository.findAll();
    }

    public Parent updateParent(Long id, Parent updated) {
        Parent p = parentRepository.findById(id).orElseThrow();
        p.setAddress(updated.getAddress());
        p.setNumberOfChildren(updated.getNumberOfChildren());
        return parentRepository.save(p);
    }

   

}
