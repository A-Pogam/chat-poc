import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { SessionUser } from './session.service';

export interface ChatMessageDto {
  senderId: number;
  receiverId: number;
  senderName: string;
  content: string;
  timestamp: string; // ISO string
}

@Injectable({ providedIn: 'root' })
export class ChatWebsocketService {
  private stompClient: Client | null = null;
  private messages$ = new Subject<ChatMessageDto>();
  private connected = false;

  private currentConversationKey: string | null = null;

  connect(conversationKey: string): Observable<ChatMessageDto> {
    this.currentConversationKey = conversationKey;

    if (this.connected && this.stompClient) {
      return this.messages$.asObservable();
    }

    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws/chat',
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str)
    });

    this.stompClient.onConnect = () => {
      console.log('[STOMP] Connected');
      this.connected = true;

      this.stompClient!.subscribe(`/topic/chat/${conversationKey}`, (message: IMessage) => {
        const body = JSON.parse(message.body) as ChatMessageDto;
        this.messages$.next(body);
      });
    };

    this.stompClient.onWebSocketError = (evt) => {
      console.error('[WS] Error', evt);
      this.connected = false;
    };

    this.stompClient.onStompError = (frame) => {
      console.error('[STOMP] Error', frame.headers['message'], frame.body);
      this.connected = false;
    };

    this.stompClient.onDisconnect = () => {
      console.log('[STOMP] Disconnected');
      this.connected = false;
    };

    this.stompClient.activate();
    return this.messages$.asObservable();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
    this.connected = false;
    this.currentConversationKey = null;
  }

  sendMessage(user: SessionUser, content: string): void {
    if (!this.stompClient || !this.connected) {
      console.warn('[STOMP] Not connected, cannot send');
      return;
    }
    if (!this.currentConversationKey) {
      console.warn('[STOMP] No conversationKey set, cannot send');
      return;
    }

    const otherUserId = user.role === 'CLIENT' ? 2 : 1;

    const payload: ChatMessageDto = {
      senderId: user.userId,
      receiverId: otherUserId,
      senderName: user.username,
      content,
      timestamp: new Date().toISOString()
    };

    this.stompClient.publish({
      destination: `/app/chat/${this.currentConversationKey}`,
      body: JSON.stringify(payload)
    });
  }
}
