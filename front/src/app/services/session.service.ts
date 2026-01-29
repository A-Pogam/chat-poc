import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this._currentUser = JSON.parse(stored);
      }
    }
  }

  get currentUser(): SessionUser | null {
    return this._currentUser;
  }

  setSession(user: SessionUser): void {
    this._currentUser = user;

    if (this.isBrowser) {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
  }

  clearSession(): void {
    this._currentUser = null;

    if (this.isBrowser) {
      sessionStorage.removeItem(this.STORAGE_KEY);
    }
  }

  isLoggedIn(): boolean {
    return !!this._currentUser;
  }

  /** Clé de conversation partagée entre 2 users : "min_max" */
  getConversationId(otherUserId: number): string {
    const me = this._currentUser;
    if (!me) {
      throw new Error('No current user in session');
    }
    const a = Math.min(me.userId, otherUserId);
    const b = Math.max(me.userId, otherUserId);
    return `${a}_${b}`;
  }

  /** Optionnel: stocke la conversation courante dans la session */
  setConversationWith(otherUserId: number): void {
    if (!this._currentUser) return;
    const sessionId = this.getConversationId(otherUserId);
    this.setSession({ ...this._currentUser, sessionId });
  }
  
}
