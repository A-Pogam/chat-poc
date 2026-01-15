package com.yourcaryourway.chat_poc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat")
                .setAllowedOriginPatterns("http://localhost:4200")
                .withSockJS(); // pour le MVP avec Angular + SockJS
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // le front s'abonnera sur /topic/...
        registry.enableSimpleBroker("/topic");
        // le front enverra sur /app/...
        registry.setApplicationDestinationPrefixes("/app");
    }
}