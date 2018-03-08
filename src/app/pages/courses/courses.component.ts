import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { CoursesService } from '../../services/courses/courses.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Course } from '../../services/courses/course';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { CoursesPage } from '../../services/courses/courses-page';
import { DeleteCourse, NewCourse, SelectCourse } from '../../services/courses/course.action';
import { AppState, selectCoursesList, selectCoursesQueryParams } from '../../app.reducers';
import {
  CoursesListPage,
  FetchCoursesList,
  FilterCoursesListByDate,
  FilterCoursesListByName,
} from '../../services/courses/courses.list.action';
import { CoursesQueryParams } from '../../services/courses/courses-query-params';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {

  coursesPage: Observable<CoursesPage>;
  private subscription: Subscription;

  constructor(private dialog: MatDialog,
              private notification: NotificationService,
              private coursesService: CoursesService,
              private store: Store<AppState>,) {
    this.coursesPage = this.store.pipe(select(selectCoursesList));
  }

  ngOnInit() {
    this.store.dispatch(new FilterCoursesListByDate(moment().subtract(14, 'd')));

    this.subscription = this.store.pipe(select(selectCoursesQueryParams)).subscribe((params: CoursesQueryParams) => {
      this.store.dispatch(new FetchCoursesList(params));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackById(index: number, course: Course): number {
    return course.id!;
  }

  deleteCourse($event: { id: number, name: string }): void {
    const dialogRef = this.dialog.open(CoursesConfirmationDialogComponent, {
      data: { name: $event.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCourse($event.id));
        this.store.dispatch(new FilterCoursesListByName(''));
      }
    });
  }

  findCourses(courseName: string): void {
    this.store.dispatch(new FilterCoursesListByName(courseName));
  }

  showPage(page: PageEvent) {
    this.store.dispatch(new CoursesListPage(page.pageIndex, page.pageSize));
  }

  editCourse(id: number): void {
    this.store.dispatch(new SelectCourse(id));
  }

  createCourse(): void {
    this.store.dispatch(new NewCourse());
  }
}
