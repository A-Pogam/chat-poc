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

  selectRole(role: UserRole) {
    if (!this.username) {
      this.username = role === 'CLIENT' ? 'ClientDemo' : 'AgentDemo';
    }

    const fakeUserId = role === 'CLIENT' ? 1 : 2;

    this.sessionService.setSession({
      role,
      username: this.username,
      userId: fakeUserId,
      sessionId: crypto.randomUUID()
    });

    this.router.navigate(['/chat']);
  }
}
