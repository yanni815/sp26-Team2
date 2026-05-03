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

    public Parent findByEmail(String email){
        return parentRepository.findByEmail(email).orElse(null);
    }

    public List<Parent> getallParents(){
        return parentRepository.findAll();
    }

    public Parent updateParent(Long id, Parent updated) {
        Parent parent = parentRepository.findById(id).orElseThrow();
        parent.setAddress(updated.getAddress());
        parent.setNumberOfChildren(updated.getNumberOfChildren());

        parent.setName(updated.getName());
        parent.setEmail(updated.getEmail());
        parent.setPassword(updated.getPassword());
        parent.setPhoneNumber(updated.getPhoneNumber());

        return parentRepository.save(parent);
    }

    public Parent getParentById(Long id) {
    return parentRepository.findById(id).orElse(null);
}

   public Parent login(String email, String password) {
    Parent parent = parentRepository.findByEmail(email)
            .orElse(null);

    if (parent == null) {
        return null;
    }

    if (!parent.getPassword().equals(password)) {
        return null;
    }

    return parent;
}

}
