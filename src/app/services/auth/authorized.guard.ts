import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState, selectIsAuthorized } from '../../app.reducers';
import { Token } from './token';
import { NoProfile } from '../profile/profile.action';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  private token: Token;

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(selectIsAuthorized)).subscribe(token => this.token = token);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.token.id === '') {
      this.store.dispatch(new NoProfile());
    }
    return true;
  }
}
