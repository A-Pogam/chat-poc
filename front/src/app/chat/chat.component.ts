import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService, SessionUser } from '../services/session.service';

interface ChatMessage {
  from: 'CLIENT' | 'AGENT';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  user: SessionUser | null = null;
  connected = true;

  messages: ChatMessage[] = [];
  newMessage = '';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.user = this.sessionService.currentUser;

    if (!this.user) {
      console.warn('Pas de session – normalement redirection vers /login');
      return;
    }

    this.messages = [
      {
        from: 'CLIENT',
        content: 'Bonjour, je cherche une voiture pour ce week-end.',
        timestamp: new Date()
      },
      {
        from: 'AGENT',
        content: 'Bonjour, je peux vous aider à trouver une offre.',
        timestamp: new Date()
      }
    ];
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.user) {
      return;
    }

    this.messages.push({
      from: this.user.role,
      content: this.newMessage.trim(),
      timestamp: new Date()
    });

    this.newMessage = '';

    setTimeout(() => {
      this.messages.push({
        from: this.user!.role === 'CLIENT' ? 'AGENT' : 'CLIENT',
        content: 'Message reçu (simulation).',
        timestamp: new Date()
      });
    }, 800);
  }
}
