package com.yourcaryourway.chat_poc.dto;

import java.time.Instant;

public class ChatMessageDto {

    private String sessionId;
    private String senderRole;
    private String senderName;
    private String content;
    private Instant timestamp;

    public ChatMessageDto() {
    }

    public ChatMessageDto(String sessionId, String senderRole, String senderName, String content, Instant timestamp) {
        this.sessionId = sessionId;
        this.senderRole = senderRole;
        this.senderName = senderName;
        this.content = content;
        this.timestamp = timestamp;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(String senderRole) {
        this.senderRole = senderRole;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
