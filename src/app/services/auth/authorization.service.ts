import {Injectable} from '@angular/core';


@Injectable()
export class AuthorizationService {
  static readonly USER_TOKEN = 'user';

  constructor() {
  }

  public login(login: string, password: string): void {
    if (login) {
      localStorage.setItem(AuthorizationService.USER_TOKEN, JSON.stringify({login, password}));
      console.log(`User ${login} logged in`);
    }
  }

  public logout(): void {
    localStorage.removeItem(AuthorizationService.USER_TOKEN);
    console.log(`User ${this.getUserInfo()} logged out`);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_TOKEN) != null;
  }

  public getUserInfo(): string {
    return this.isAuthenticated() ? JSON.parse(localStorage.getItem(AuthorizationService.USER_TOKEN)).login : null;
  }
}
