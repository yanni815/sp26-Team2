package com.edu.uncg.backend_api.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edu.uncg.backend_api.entity.Babysitter;
import com.edu.uncg.backend_api.service.BabysitterService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/babysitters")
public class BabysitterController {

    @Autowired
    private BabysitterService babysitterService;

    @GetMapping
    public List<Babysitter> getAllBabysitters() {
        return babysitterService.getAll();
    }

    @PostMapping
    public Babysitter createBabysitter(@RequestBody Babysitter babysitter) {
        return babysitterService.save(babysitter);
    }

    @PutMapping("/{id}")
    public Babysitter updateBabysitter(@PathVariable Long id, @RequestBody Babysitter babysitter) {
        return babysitterService.updateBabysitter(id, babysitter);
    }

    @DeleteMapping("/{id}")
    public void deleteBabysitter(@PathVariable Long id) {
        babysitterService.deleteBabysitter(id);
    }
}