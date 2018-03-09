import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, selectIsAuthorized } from '../../app.reducers';
import { Token } from './token';

/** Adds authorization token to every request. */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private token: Token;

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(selectIsAuthorized)).subscribe((token) => {
      this.token = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: { Authorization: this.token.token } });
    return next.handle(authReq);
  }
}
