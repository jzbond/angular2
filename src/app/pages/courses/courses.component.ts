import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../services/courses/course';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CoursesPage } from '../../services/courses/courses-page';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

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


  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private coursesService: CoursesService) {
    this.outdatedTime = moment().subtract(14, 'd');
    this.courseName = '';
    this.pageSize = 2;
    this.pageIndex = 0;
    this.coursesPage = coursesService.coursesList;
  }

  ngOnInit() {
    this.fetchCourses();
    this.coursesService.deletedCourse.pipe(takeUntil(this.subscriptions)).subscribe(name => this.showNotification(`Deleted ${name} course`));
    this.coursesService.savedCourse.pipe(takeUntil(this.subscriptions)).subscribe(name => this.showNotification(`Saved ${name} course`));
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

  selectCourse(id?: number): void {
    this.coursesService.selectCourse(id);
  }

  saveCourse(course: Course): void {
    console.log(`Saving course ${JSON.stringify(course)}`);
    // TODO: this.coursesService.saveCourse(course);
    this.coursesService.cancel();
  }

  cancelEdit(): void {
    this.coursesService.cancel();
  }

  private fetchCourses() {
    this.coursesService.fetchCourses({
      courseName: this.courseName,
      courseDate: this.outdatedTime,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    });
  }

  private showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }
}
