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
    @GetMapping("/conversations/{user1}/{user2}")
    public List<Message> getConversation(@PathVariable Long user1, @PathVariable Long user2) {
        String key = com.yourcaryourway.chat_poc.util.ConversationKey.of(user1, user2);
        return messageRepository.findByConversationKeyOrderByCreatedAtAsc(key);
    }
}