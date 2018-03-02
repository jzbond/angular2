import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Moment } from 'moment';

import { CoursesService } from '../../services/courses/courses.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Course } from '../../services/courses/course';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { CoursesPage } from '../../services/courses/courses-page';
import { DeleteCourse, NewCourse, SelectCourse } from '../../services/courses/course.action';
import { AppState } from '../../app.reducers';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {

  coursesPage: Observable<CoursesPage>;
  pageIndex: number;

  private outdatedTime: Moment;
  private courseName: string;
  private pageSize: number;


  constructor(private dialog: MatDialog,
              private notification: NotificationService,
              private coursesService: CoursesService,
              private store: Store<AppState>,) {
    this.outdatedTime = moment().subtract(14, 'd');
    this.courseName = '';
    this.pageSize = 2;
    this.pageIndex = 0;
    this.coursesPage = coursesService.coursesList;
  }

  ngOnInit() {
    this.fetchCourses();
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
      }
    });
  }

  findCourses(courseName: string): void {
    this.courseName = courseName;
    this.pageIndex = 0;
    this.fetchCourses();
  }

  showPage(page: PageEvent) {
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    this.fetchCourses();
  }

  editCourse(id: number): void {
    this.store.dispatch(new SelectCourse(id));
  }

  createCourse(): void {
    this.store.dispatch(new NewCourse());
  }

  private fetchCourses() {
    this.coursesService.fetchCourses({
      courseName: this.courseName,
      courseDate: this.outdatedTime,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    });
  }
}
