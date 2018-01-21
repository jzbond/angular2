import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthorizationService {
  static readonly USER_TOKEN = 'user';

  private userSubject = new BehaviorSubject<string>(this.getUserInfo());

  public user: Observable<string> = this.userSubject.asObservable();

  constructor() {
  }

  public login(login: string, password: string): Observable<string> {
    if (login) {
      return Observable.of({ login, password })
        .delay(500)
        .do(resp => localStorage.setItem(AuthorizationService.USER_TOKEN, JSON.stringify(resp)))
        .map(resp => resp.login)
        .do(user => this.userSubject.next(user))
        .do(user => console.log(`User ${user} logged in`))
        ;
    }
    return Observable.empty();
  }

  public logout(): Observable<string> {
    return Observable.of(this.getUserInfo())
      .do((login) => console.log(`User ${login} logged out`))
      .do(() => localStorage.removeItem(AuthorizationService.USER_TOKEN))
      .do(() => this.userSubject.next(null))
      ;
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_TOKEN) != null;
  }

  public getUserInfo(): string {
    return this.isAuthenticated() ? JSON.parse(localStorage.getItem(AuthorizationService.USER_TOKEN)).login : null;
  }
}
