import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay, map, share, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from './user';
import { Login } from './login';


@Injectable()
export class AuthorizationService {
  static readonly USER_TOKEN = 'user';

  private loginSubject = new ReplaySubject<Login>(1);
  private logoutSubject = new ReplaySubject<User>(1);

  public readonly userLogin: Observable<User> = this.loginSubject.asObservable()
    .pipe(
      tap(resp => {
        if (resp.login) {
          // emulate http request
          return delay(500);
        }
      }),
      tap(resp => {
        if (resp.login) {
          localStorage.setItem(AuthorizationService.USER_TOKEN, JSON.stringify(resp));
          console.log(`User ${resp.login} logged in`);
        }
      }),
      map(resp => {
        return { login: resp.login };
      }),
      share(),
    );

  public readonly userLogout: Observable<User> = this.logoutSubject.asObservable()
    .pipe(
      tap((login) => console.log(`User ${login} logged out`)),
      tap(() => localStorage.removeItem(AuthorizationService.USER_TOKEN)),
      tap(() => this.login('', '')),
      share(),
    );

  constructor() {
    this.userLogout.subscribe();
  }

  public login(login: string, password: string): void {
    this.loginSubject.next({ login, password });
  }

  public logout(login: string): void {
    this.logoutSubject.next({ login });
  }

  public init(): void {
    if (this.isAuthenticated()) {
      const value = this.getLocalStorageValue();
      console.log(`Restoring credentials: ${value.login}`);
      this.login(value.login, value.password);
    }
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_TOKEN) != null;
  }

  private getLocalStorageValue() {
    return JSON.parse(localStorage.getItem(AuthorizationService.USER_TOKEN) || '{}');
  }
}
