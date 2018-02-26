import { Action } from '@ngrx/store';

import { User } from './user';


export interface ProfileState {
  profile: User;
}

export enum ProfileActionType {
  USER = 'Profile',
  NO_PROFILE = 'No user',
}

export type ProfileAction = UserProfile | NoProfile;

export class UserProfile implements Action {
  readonly type = ProfileActionType.USER;

  constructor(public user: User) {
  }
}

export class NoProfile implements Action {
  readonly type = ProfileActionType.NO_PROFILE;
}
