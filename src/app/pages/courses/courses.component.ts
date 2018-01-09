import {Component, Inject, OnInit} from '@angular/core';
import {CoursesService} from "../../services/courses/courses.service";
import {Course} from "../../services/courses/course";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
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
    let dialogRef = this.dialog.open(CoursesConfirmationDialog, {
      data: {name: $event.name},
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

@Component({
  selector: 'courses-confirmation-dialog',
  templateUrl: 'courses.component.dialog.html',
  styles: ['button {margin: 5px;}'],
})
export class CoursesConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<CoursesConfirmationDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
