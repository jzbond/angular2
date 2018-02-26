import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

import { ProfileService } from './profile.service';
import { NoProfile, ProfileActionType, UserProfile } from './profile.action';
import { AuthorizationActionType, AuthorizeUser } from '../auth/authorization.action';

@Injectable()
export class ProfileEffect {

  @Effect()
  profile: Observable<Action> = this.actions.pipe(
    ofType(AuthorizationActionType.AUTHORIZE),
    mergeMap((action: AuthorizeUser) => {
        return this.profileService.readProfile(action.token).pipe(
          map(profile => {
            this.router.navigate([ '/' ]);
            return new UserProfile(profile);
          }),
          catchError(() => observableOf(new NoProfile()))
        );
      }
    ),
  );


  @Effect({ dispatch: false })
  noProfile: Observable<Action> = this.actions.pipe(
    ofType(ProfileActionType.NO_PROFILE),
    tap((action: NoProfile) => {
      this.router.navigate([ '/login' ]);
    })
  );

  constructor(private readonly actions: Actions,
              private readonly profileService: ProfileService,
              private readonly router: Router,) {
  }
}
