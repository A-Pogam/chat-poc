package com.yourcaryourway.chat_poc.controller;

import com.yourcaryourway.chat_poc.model.Message;
import com.yourcaryourway.chat_poc.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @PostMapping("/messages")
    public Message sendMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    @GetMapping("/conversations/{user1}/{user2}")
    public List<Message> getConversation(@PathVariable("user1") Long user1,
                                         @PathVariable("user2") Long user2) {
        return messageRepository
                .findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByCreatedAtAsc(
                        user1, user2, user2, user1
                );
    }

}