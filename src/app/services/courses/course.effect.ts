import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

import {
  CourseActionType,
  DeleteCourse,
  DeletedCourse,
  EditCourse,
  SaveCourse,
  SavedCourse,
  SelectCourse
} from './course.action';
import { CoursesService } from './courses.service';
import { NotificationService } from '../notification/notification.service';
import { ListCourses } from './courses.list.action';

@Injectable()
export class CourseEffect {

  @Effect()
  selectExistingCourse: Observable<Action> = this.actions.pipe(
    ofType(CourseActionType.SELECT),
    switchMap((selectAction: SelectCourse) => {
      return this.coursesService.selectCourse(selectAction.courseId).pipe(
        map(course => {
          this.router.navigate([ `courses/${course.id}` ]);
          return new EditCourse(course);
        }),
      );
    }),
  );

  @Effect()
  selectNewCourse: Observable<Action> = this.actions.pipe(
    ofType(CourseActionType.NEW),
    mergeMap(() => {
      return this.coursesService.selectCourse().pipe(
        map(course => {
          this.router.navigate([ `courses/new` ]);
          return new EditCourse(course);
        }),
      );
    }),
  );

  @Effect()
  saveCourse: Observable<Action> = this.actions.pipe(
    ofType(CourseActionType.SAVE),
    mergeMap((saveAction: SaveCourse) => {
      return this.coursesService.saveCourse(saveAction.course).pipe(
        map((course) => new SavedCourse(course)),
      );
    }),
  );

  @Effect()
  savedCourse: Observable<Action> = this.actions.pipe(
    ofType(CourseActionType.SAVED),
    switchMap((savedAction: SavedCourse) => {
      this.notificationService.show(`Saved ${savedAction.course.name} course`);
      return observableOf(new ListCourses());
    }),
  );

  @Effect()
  deleteCourse: Observable<Action> = this.actions.pipe(
    ofType(CourseActionType.DELETE),
    mergeMap((deleteAction: DeleteCourse) => {
      return this.coursesService.removeCourse(deleteAction.courseId).pipe(
        mapTo(new DeletedCourse(deleteAction.courseId)),
      );
    }),
  );

  @Effect()
  deletedCourse: Observable<Action> = this.actions.pipe(
    ofType(CourseActionType.DELETED),
    switchMap((deletedAction: DeletedCourse) => {
      this.notificationService.show(`Deleted course #${deletedAction.courseId}`);
      return observableOf(new ListCourses());
    }),
  );

  constructor(private actions: Actions,
              private coursesService: CoursesService,
              private notificationService: NotificationService,
              private router: Router,) {
  }
}
