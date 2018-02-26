import { ActionReducerMap, createSelector } from '@ngrx/store';

import { AuthorizedState } from './services/auth/authorization.action';
import { ProfileState } from './services/profile/profile.action';
import { authorizationReducer } from './services/auth/authorization.reducer';
import { profileReducer } from './services/profile/profile.reducer';
import { AuthorizationEffect } from './services/auth/authorization.effect';
import { ProfileEffect } from './services/profile/profile.effect';

export interface AppState {
  authorized: AuthorizedState;
  profile: ProfileState
}

export const appReducers: ActionReducerMap<AppState> = {
  authorized: authorizationReducer,
  profile: profileReducer,
};

export const appEffects = [
  AuthorizationEffect,
  ProfileEffect,
];

const selectAuthorized = (state: AppState) => state.authorized;
const selectProfile = (state: AppState) => state.profile;
export const selectIsAuthorized = createSelector(selectAuthorized, (state: AuthorizedState) => state.token);
export const selectUserProfile = createSelector(selectProfile, (state: ProfileState) => state.profile);

