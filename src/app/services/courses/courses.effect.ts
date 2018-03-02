import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { CoursesActionType, ListCourses, } from './courses.action';
import { CoursesService } from './courses.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CoursesEffect {

  @Effect({ dispatch: false })
  selectCourses: Observable<Action> = this.actions.pipe(
    ofType(CoursesActionType.LIST),
    tap((listAction: ListCourses) => {
      this.router.navigate([ '/courses' ]);
    }),
  );


  constructor(private actions: Actions,
              private coursesService: CoursesService,
              private notificationService: NotificationService,
              private router: Router,) {
  }
}
