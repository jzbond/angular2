import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Moment } from 'moment';

import { CoursesService } from '../../services/courses/courses.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Course } from '../../services/courses/course';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { CoursesPage } from '../../services/courses/courses-page';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {

  coursesPage: Observable<CoursesPage>;
  selectedCourse: Observable<Course | null>;
  pageIndex: number;

  private subscriptions: Subject<boolean> = new Subject();
  private outdatedTime: Moment;
  private courseName: string;
  private pageSize: number;


  constructor(private dialog: MatDialog, private notification: NotificationService, private coursesService: CoursesService, private router: Router) {
    this.outdatedTime = moment().subtract(14, 'd');
    this.courseName = '';
    this.pageSize = 2;
    this.pageIndex = 0;
    this.coursesPage = coursesService.coursesList;
  }

  ngOnInit() {
    this.fetchCourses();
    this.coursesService.deletedCourse.pipe(takeUntil(this.subscriptions)).subscribe(() => this.notification.show(`Deleted course`));
    this.selectedCourse = this.coursesService.selectedCourse;
  }

  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.unsubscribe();
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
        this.coursesService.removeCourse($event.id);
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

  editCourse(id?: number): void {
    this.router.navigate([ `courses/${id}` ]);
  }

  createCourse(): void {
    this.router.navigate([ `courses/new` ]);
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
