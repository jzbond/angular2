import { Action } from '@ngrx/store';

import { Token } from './token';
import { Login } from './login';


export interface AuthorizedState {
  token: Token;
}

export enum AuthorizationActionType {
  RESTORE = '[Authorization] Restore Credentials',
  LOGIN = '[Authorization] Login User',
  AUTHORIZE = '[Authorization] Authorize User',
  LOGOUT = '[Authorization] Logout User',
}

export type AuthorizationAction = RestoreUser | LoginUser | AuthorizeUser | LogoutUser;

export class RestoreUser implements Action {
  readonly type = AuthorizationActionType.RESTORE;
}

export class LoginUser implements Action {
  readonly type = AuthorizationActionType.LOGIN;

  constructor(public login: Login) {
  }
}

export class AuthorizeUser implements Action {
  readonly type = AuthorizationActionType.AUTHORIZE;

  constructor(public token: Token) {
  }
}

export class LogoutUser implements Action {
  readonly type = AuthorizationActionType.LOGOUT;

  constructor(public login: string) {
  }
}
