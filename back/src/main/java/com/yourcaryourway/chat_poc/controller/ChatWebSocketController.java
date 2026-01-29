package com.yourcaryourway.chat_poc.controller;

import com.yourcaryourway.chat_poc.dto.ChatMessageDto;
import com.yourcaryourway.chat_poc.model.Message;
import com.yourcaryourway.chat_poc.repository.MessageRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate,
                                   MessageRepository messageRepository) {
        this.messagingTemplate = messagingTemplate;
        this.messageRepository = messageRepository;
    }

    @MessageMapping("/chat/{conversationKey}")
    public void handleChatMessage(@DestinationVariable String conversationKey,
                                  ChatMessageDto dto) {

        if (dto.getSenderId() == null || dto.getReceiverId() == null) return;
        System.out.println("DTO reçu: senderId=" + dto.getSenderId() + " receiverId=" + dto.getReceiverId()
                + " content=" + dto.getContent());

        Message m = new Message();
        m.setSenderId(dto.getSenderId());
        m.setReceiverId(dto.getReceiverId());
        m.setContent(dto.getContent());
        m.setConversationKey(conversationKey);
        messageRepository.save(m);

        messagingTemplate.convertAndSend("/topic/chat/" + conversationKey, dto);
    }

}
