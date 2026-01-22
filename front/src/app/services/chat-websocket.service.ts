import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { SessionUser } from './session.service';

export interface ChatMessageDto {
  sessionId: string;
  senderRole: 'CLIENT' | 'AGENT';
  senderName: string;
  content: string;
  timestamp: string; // ISO string
}

@Injectable({ providedIn: 'root' })
export class ChatWebsocketService {
  private stompClient: Client | null = null;
  private messages$ = new Subject<ChatMessageDto>();
  private connected = false;

  connect(sessionId: string): Observable<ChatMessageDto> {
    if (this.connected && this.stompClient) {
      return this.messages$.asObservable();
    }

    this.stompClient = new Client({
      // ✅ WebSocket natif (STOMP au-dessus)
      brokerURL: 'ws://localhost:8080/ws/chat',
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str)
    });

    this.stompClient.onConnect = () => {
      console.log('[STOMP] Connected');
      this.connected = true;

      this.stompClient!.subscribe(`/topic/chat/${sessionId}`, (message: IMessage) => {
        const body = JSON.parse(message.body) as ChatMessageDto;
        this.messages$.next(body);
      });
    };

    this.stompClient.onWebSocketError = (evt) => {
      console.error('[WS] Error', evt);
    };

    this.stompClient.onStompError = (frame) => {
      console.error('[STOMP] Error', frame.headers['message'], frame.body);
    };

    this.stompClient.activate();
    return this.messages$.asObservable();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
    this.connected = false;
  }

  sendMessage(sessionId: string, user: SessionUser, content: string): void {
    if (!this.stompClient || !this.connected) {
      console.warn('[STOMP] Not connected, cannot send');
      return;
    }

    const payload: ChatMessageDto = {
      sessionId,
      senderRole: user.role,
      senderName: user.username,
      content,
      timestamp: new Date().toISOString()
    };

    this.stompClient.publish({
      destination: `/app/chat/${sessionId}`,
      body: JSON.stringify(payload)
    });
  }
}
