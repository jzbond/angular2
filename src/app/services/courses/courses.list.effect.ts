import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

import { CoursesListActionType, CoursesListFetched, FetchCoursesList, } from './courses.list.action';
import { CoursesService } from './courses.service';
import { CoursesPage } from './courses-page';

@Injectable()
export class CoursesListEffect {

  @Effect()
  selectCourses: Observable<Action> = this.actions.pipe(
    ofType(CoursesListActionType.FETCH),
    switchMap((fetchCourses: FetchCoursesList) => {
      return this.coursesService.fetchCourses(fetchCourses.coursesQueryParams).pipe(
        map((coursesPage: CoursesPage) => {
          return new CoursesListFetched(coursesPage);
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  navigateToCourses: Observable<Action> = this.actions.pipe(
    ofType(CoursesListActionType.LIST),
    tap(() => {
      this.router.navigate([ '/courses' ]);
    })
  );

  constructor(private actions: Actions,
              private coursesService: CoursesService,
              private router: Router,) {
  }
}
