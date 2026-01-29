package com.yourcaryourway.chat_poc.dto;

import java.time.Instant;

public class ChatMessageDto {

    private Long senderId;
    private Long receiverId;
    private String senderName;
    private String content;
    private Instant timestamp;

    public ChatMessageDto() {
    }

    public ChatMessageDto(Long senderId, Long receiverId, String senderName, String content, Instant timestamp) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderName = senderName;
        this.content = content;
        this.timestamp = timestamp;
    }


    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
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
