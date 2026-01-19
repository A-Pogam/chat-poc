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
      console.warn('Pas de session – normalement redirection vers /login');
      return;
    }

    const sessionId = this.user.sessionId;

   this.wsSub = this.chatWsService.connect(sessionId).subscribe({
  next: (msg) => {
    this.connected = true;
    this.messages.push(msg);
  },
  error: (err) => {
    console.error('Erreur WS', err);
    this.connected = false;
  }
});

  }

  ngOnDestroy(): void {
    if (this.wsSub) {
      this.wsSub.unsubscribe();
    }
    this.chatWsService.disconnect();
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.user || !this.user.sessionId) {
      return;
    }

    const sessionId = this.user.sessionId;
    this.chatWsService.sendMessage(sessionId, this.user, this.newMessage.trim());
    this.newMessage = '';
  }
}
