import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../services/courses/course';
import { MatDialog } from '@angular/material';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {

  private coursesService: CoursesService;
  courses: Array<Course>;

  constructor(public dialog: MatDialog) {
    this.coursesService = new CoursesService();
  }

  ngOnInit() {
    this.refreshCoursesList();
  }

  trackById(index: number, course: Course): number {
    return course.id;
  }

  deleteCourse($event) {
    const dialogRef = this.dialog.open(CoursesConfirmationDialogComponent, {
      data: { name: $event.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.removeCourse($event.id);
        this.refreshCoursesList();
      }
    });
  }

  findCourse($event) {
    this.refreshCoursesList($event.name);
  }

  private refreshCoursesList(courseName?: string) {
    const coursesList = this.coursesService.listCourses();
    this.courses = courseName
      ? coursesList.filter((course) => course.name.toLowerCase().includes(courseName.toLowerCase()))
      : coursesList;
  }

}
