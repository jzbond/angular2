import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Login } from './login';
import { Token } from './token';


@Injectable()
export class AuthorizationService {
  private static readonly SERVER_BASE_URL: String = 'http://localhost:3000';
  private static readonly USER_TOKEN = 'user';

  constructor(private readonly httpClient: HttpClient) {
  }

  public restoreAuthorizedUser(): Observable<Token> {
    const persistedToken = localStorage.getItem(AuthorizationService.USER_TOKEN);
    if (persistedToken) {
      return observableOf(JSON.parse(persistedToken));
    }
    return observableOf();
  }

  public login(login: Login): Observable<Token> {
    return this.httpClient.get<Token>(`${AuthorizationService.SERVER_BASE_URL}/login/${login.login}`)
      .pipe(
        map(token => {
          localStorage.setItem(AuthorizationService.USER_TOKEN, JSON.stringify(token));
          return token;
        }),
      );

  }

  public logout(login: string): Observable<void> {
    return observableOf(login).pipe(
      map(login => {
        localStorage.removeItem(AuthorizationService.USER_TOKEN);
        console.log(`User ${login} logged out`);
      })
    );
  }
}
