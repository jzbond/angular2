import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../services/courses/course';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {

  private outdatedTime: Moment;
  private deletedCourseSubscription: Subscription;
  private savedCourseSubscription: Subscription;
  courses: Observable<Course[]>;
  selectedCourse: Observable<Course | null>;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private coursesService: CoursesService) {
    this.outdatedTime = moment().subtract(14, 'd');
    this.courses = coursesService.coursesList;
  }

  private showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }

  ngOnInit() {
    this.coursesService.initCourses(this.outdatedTime);
    this.deletedCourseSubscription = this.coursesService.deletedCourse.subscribe(name => this.showNotification(`Deleted ${name} course`));
    this.savedCourseSubscription = this.coursesService.savedCourse.subscribe(name => this.showNotification(`Saved ${name} course`));
    this.selectedCourse = this.coursesService.selectedCourse;
  }

  ngOnDestroy() {
    this.deletedCourseSubscription.unsubscribe();
    this.savedCourseSubscription.unsubscribe();
  }

  trackById(index: number, course: Course): number {
    return course.id;
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

  findCourses(courseName?: string): void {
    this.coursesService.filterCourses(courseName);
  }

  selectCourse(id?: number): void {
    this.coursesService.selectCourse(id);
  }

  saveCourse(course: Course): void {
    this.coursesService.saveCourse(course);
  }

  cancelEdit(): void {
    this.coursesService.cancel();
  }
}
