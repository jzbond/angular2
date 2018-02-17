import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from './user';
import { Login } from './login';


@Injectable()
export class AuthorizationServiceStub {
  private isLogged = false;
  private loginSubject = new ReplaySubject<Login>(1);
  private logoutSubject = new ReplaySubject<User>(1);

  public readonly profile: Observable<User> = this.loginSubject.asObservable()
    .pipe(
      map((login: Login) => {
        this.isLogged = true;
        return { id: login.login, name: 'John', surname: 'Smith' };
      }),
    );

  public readonly userLogout: Observable<User> = this.logoutSubject.asObservable()
    .pipe(
      map((user) => {
        this.isLogged = false;
        return user;
      }),
    );

  public init(): void {
  }

  public login(login: string, password: string): void {
    this.loginSubject.next({ login, password });
  }

  public logout(login: string): void {
    this.logoutSubject.next({ id: login });
  }

  public isAuthenticated(): boolean {
    return this.isLogged;
  }
}
