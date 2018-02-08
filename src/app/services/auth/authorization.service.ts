import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, share, shareReplay, switchMap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from './user';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';
import { Token } from './token';
import { of as observableOf } from 'rxjs/observable/of';


@Injectable()
export class AuthorizationService {
  private static readonly SERVER_BASE_URL: String = 'http://localhost:3000';
  static readonly USER_TOKEN = 'user';

  private loginSubject = new ReplaySubject<Login>(1);
  private logoutSubject = new ReplaySubject<User>(1);

  public readonly profile: Observable<User> = this.loginSubject.asObservable()
    .pipe(
      switchMap((login: Login) => {
          if (this.isAuthenticated()) {
            const value = this.getLocalStorageValue();
            console.log(`Restoring credentials: ${value.id}`);
            return observableOf(value);
          } else if (login.login) {
            return this.httpClient
              .get<Token>(
                `${AuthorizationService.SERVER_BASE_URL}/login/${login.login}`,
              ).pipe(
                catchError(() => observableOf({ id: '', token: '' })),
              );
          } else {
            return observableOf({ id: '', token: '' });
          }
        }
      ),
      switchMap((authToken: Token) => {
        if (authToken.id) {
          localStorage.setItem(AuthorizationService.USER_TOKEN, JSON.stringify(authToken));
          console.log(`User ${authToken.id} logged in`);
          return this.httpClient.get<User>(`${AuthorizationService.SERVER_BASE_URL}/profiles/${authToken.id}`);
        } else {
          return observableOf({ id: '' });
        }
      }),
      catchError(() => observableOf({ id: '' })),
      shareReplay(),
    );

  public readonly userLogout: Observable<User> = this.logoutSubject.asObservable()
    .pipe(
      switchMap((user: User) => {
        console.log(`User ${user.id} logged out`);
        localStorage.removeItem(AuthorizationService.USER_TOKEN);
        this.login('', '');
        return observableOf(user);
      }),
      share(),
    );

  constructor(private readonly httpClient: HttpClient) {
    this.userLogout.subscribe();
  }

  public init(): void {
    this.login('', '');
  }

  public login(login: string, password: string): void {
    this.loginSubject.next({ login, password });
  }

  public logout(login: string): void {
    this.logoutSubject.next({ id: login });
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_TOKEN) != null;
  }

  public getAuthToken(): string {
    return this.getLocalStorageValue().token;
  }

  protected getLocalStorageValue(): Token {
    return JSON.parse(localStorage.getItem(AuthorizationService.USER_TOKEN)!);
  }
}
