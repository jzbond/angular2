import {Injectable} from '@angular/core';


@Injectable()
export class AuthorizationService {
  static readonly USER_TOKEN = 'user';

  constructor() {
  }

  public login(login: string, password: string) {
    localStorage.setItem(AuthorizationService.USER_TOKEN, JSON.stringify({login, password}));
  }

  public logout() {
    localStorage.removeItem(AuthorizationService.USER_TOKEN);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_TOKEN) != null;
  }

  public getUserInfo() {
    return this.isAuthenticated() ? JSON.parse(localStorage.getItem(AuthorizationService.USER_TOKEN)).login : null;
  }
}
