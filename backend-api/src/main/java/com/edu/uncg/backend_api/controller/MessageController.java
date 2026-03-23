package com.edu.uncg.backend_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import com.edu.uncg.backend_api.entity.Message;

import com.edu.uncg.backend_api.service.MessageService;



@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

   @PostMapping("/send")
   public Message sendMessage(@RequestBody Message message){
    return messageService.send(message);
   }

   @GetMapping
   public List<Message> getallMessages(){
    return messageService.getAll();
   }

    @PutMapping
     public Message updateMessage(@PathVariable Long id, @RequestBody Message message){
        return messageService.save(message);

    }

     @DeleteMapping("/{id}")
    public Message deleteMessage(@PathVariable Long id){
         return messageService.deleteMessage(id);
    }

}


