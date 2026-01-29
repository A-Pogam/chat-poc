import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService, SessionUser } from '../services/session.service';
import { ChatWebsocketService, ChatMessageDto } from '../services/chat-websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

  user: SessionUser | null = null;
  connected = false;

  messages: ChatMessageDto[] = [];
  newMessage = '';

  private wsSub?: Subscription;

  constructor(
    private sessionService: SessionService,
    private chatWsService: ChatWebsocketService
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.currentUser;

    if (!this.user || !this.user.sessionId) {
      console.warn('[Chat] Pas de session – normalement redirection vers /login');
      this.connected = false;
      return;
    }

    const conversationKey = this.user.sessionId; 
    console.log('[Chat] Connecting with conversationKey =', conversationKey);

    this.wsSub = this.chatWsService.connect(conversationKey).subscribe({
      next: (msg) => {
        this.connected = true;
        this.messages.push(msg);
      },
      error: (err) => {
        console.error('[Chat] Erreur WS', err);
        this.connected = false;
      },
      complete: () => {
        console.warn('[Chat] WS stream completed');
        this.connected = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
    this.chatWsService.disconnect();
  }

  sendMessage(): void {
    if (!this.user) return;

    const content = this.newMessage.trim();
    if (!content) return;

    this.chatWsService.sendMessage(this.user, content);
    this.newMessage = '';
  }
}
