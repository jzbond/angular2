import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { AuthorizationActionType, AuthorizeUser, LoginUser, LogoutUser } from './authorization.action';
import { AuthorizationService } from './authorization.service';
import { NoProfile } from '../profile/profile.action';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthorizationEffect {

  @Effect()
  restore: Observable<Action> = this.actions.pipe(
    ofType(AuthorizationActionType.RESTORE),
    mergeMap(() => {
      return this.authorizationService.restoreAuthorizedUser().pipe(
        map(token => {
          if (token) {
            return new AuthorizeUser(token);
          }
          return new NoProfile();
        }),
      );
    }),
  );

  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(AuthorizationActionType.LOGIN),
    mergeMap((loginAction: LoginUser) => {
      return this.authorizationService.login(loginAction.login).pipe(
        map(token => new AuthorizeUser(token)),
      );
    }),
  );

  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(AuthorizationActionType.LOGOUT),
    mergeMap((logoutAction: LogoutUser) => {
      return this.authorizationService.logout(logoutAction.login).pipe(
        map(() => new NoProfile()),
      );
    }),
  );

  constructor(private actions: Actions, private authorizationService: AuthorizationService) {
  }
}
