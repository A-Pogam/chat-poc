package com.yourcaryourway.chat_poc.util;

public final class ConversationKey {
    private ConversationKey() {}

    public static String of(long user1, long user2) {
        long a = Math.min(user1, user2);
        long b = Math.max(user1, user2);
        return a + "_" + b;
    }
}