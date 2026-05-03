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

   @PostMapping("/send/{senderId}/{receiverId}")
   public Message sendMessage( @PathVariable Long senderId, @PathVariable Long receiverId,@RequestBody Message message){
    return messageService.send(senderId, receiverId, message);
   }

   @GetMapping
   public List<Message> getallMessages(){
    return messageService.getAll();
   }

    @PutMapping("/{id}")
    public Message updateMessage(@PathVariable Long id, @RequestBody Message message){
        return messageService.save(message);

    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id){
        messageService.deleteMessage(id);

}

    }
