import { Injectable } from '@angular/core';

export type UserRole = 'CLIENT' | 'AGENT';

export interface SessionUser {
  role: UserRole;
  username: string;
  userId: number;
  sessionId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly STORAGE_KEY = 'ycw_session';
  private _currentUser: SessionUser | null = null;

  constructor() {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this._currentUser = JSON.parse(stored);
    }
  }

  get currentUser(): SessionUser | null {
    return this._currentUser;
  }

  setSession(user: SessionUser): void {
    this._currentUser = user;
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  clearSession(): void {
    this._currentUser = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this._currentUser;
  }
}
