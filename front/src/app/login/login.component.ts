import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService, UserRole } from '../services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  // Génère un id de session sans utiliser crypto
  private generateSessionId(): string {
    return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  selectRole(role: UserRole): void {
    console.log('[Login] selectRole called with role =', role, 'username =', this.username);

    if (!this.username) {
      this.username = role === 'CLIENT' ? 'ClientDemo' : 'AgentDemo';
    }

    const fakeUserId = role === 'CLIENT' ? 1 : 2;

    this.sessionService.setSession({
      role,
      username: this.username,
      userId: fakeUserId,
      sessionId: this.generateSessionId()
    });

    console.log('[Login] session set, navigating to /chat');

    this.router.navigate(['/chat']);
  }
}
