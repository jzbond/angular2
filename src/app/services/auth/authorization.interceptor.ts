import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from './authorization.service';

/** Adds authorization token to every request. */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenString = localStorage.getItem(AuthorizationService.USER_TOKEN);
    if (tokenString) {
      const authReq = req.clone({ setHeaders: { Authorization: JSON.parse(tokenString!).token } });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
