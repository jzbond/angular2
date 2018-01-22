import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../services/courses/course';
import { MatDialog } from '@angular/material';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {

  private outdatedTime: Moment;
  courses: Observable<Array<Course>>;

  constructor(public dialog: MatDialog, private coursesService: CoursesService) {
    this.outdatedTime = moment().subtract(14, 'd');
    this.courses = coursesService.courses;
  }

  ngOnInit() {
    this.findCourses();
  }

  hasEditRequest(): boolean {
    return this.coursesService.hasCourseToken();
  }

  trackById(index: number, course: Course): number {
    return course.id;
  }

  deleteCourse($event): void {
    const dialogRef = this.dialog.open(CoursesConfirmationDialogComponent, {
      data: { name: $event.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.removeCourse($event.id).subscribe();
      }
    });
  }

  findCourses(courseName?: string): void {
    this.coursesService.filterCourses(courseName, this.outdatedTime).subscribe();
  }

  editCourse(id?: number): void {
    this.coursesService.requestNewCourseData(id).subscribe();
  }

  getEditCourse(): Observable<Course> {
    return this.coursesService.getCourse(this.coursesService.getCourseTokenValue());
  }

  saveCourse(course: Course): void {
    this.coursesService.cancelNewCourseData().subscribe();
  }

  cancelEdit(): void {
    this.coursesService.cancelNewCourseData().subscribe();
  }
}
