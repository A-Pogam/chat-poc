package com.yourcaryourway.chat_poc.controller;

import com.yourcaryourway.chat_poc.dto.ChatMessageDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{sessionId}")
    public void handleChatMessage(@DestinationVariable String sessionId,
                                  ChatMessageDto message) {

        // Assurer les champs obligatoires côté serveur
        if (message.getTimestamp() == null) {
            message.setTimestamp(Instant.now());
        }
        message.setSessionId(sessionId);

        // Broadcast aux abonnés de cette session
        messagingTemplate.convertAndSend("/topic/chat/" + sessionId, message);
    }
}
