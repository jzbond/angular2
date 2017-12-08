import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../services/courses/courses.service";
import {Course} from "../../services/courses/course";

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  private coursesService: CoursesService;
  courses: Array<Course>;

  constructor() {
    this.coursesService = new CoursesService();
    this.courses = this.coursesService.listCourses();
  }

  ngOnInit() {
  }

  trackById(index: number, course: Course): number {
    return course.id;
  }

  deleteCourse($event) {
    console.log(`deleting course ${$event.id}`);
  }

}
