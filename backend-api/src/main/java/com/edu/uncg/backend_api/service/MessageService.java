package com.edu.uncg.backend_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


import com.edu.uncg.backend_api.entity.Message;
import com.edu.uncg.backend_api.entity.User;
import com.edu.uncg.backend_api.repository.MessageRepository;
import com.edu.uncg.backend_api.repository.UserRepository;


@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    public Message send(Message message){
        Long senderId = message.getSender().getId();
        Long receiverId = message.getReceiver().getId();

        User sender = userRepository.findById(senderId).orElseThrow();
        User receiever = userRepository.findById(receiverId).orElseThrow();

        message.setSender(sender);
        message.setReceiver(receiever);
        return messageRepository.save(message);
    }

     public Message save(Message message){
        return messageRepository.save(message);
    }

    public List<Message> getAll(){
        return messageRepository.findAll();
    }

   public Message deleteMessage(Long id){
        Message message = messageRepository.findById(id).orElseThrow();
        return messageRepository.save(message);
}
}