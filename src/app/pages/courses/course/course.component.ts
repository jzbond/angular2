import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Course} from "../../../services/courses/course";

@Component({
  selector: 'course-card',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Output('delete') deleteCourse = new EventEmitter();
  @Input('course') course: Course = {
    id: 0,
    description: '',
    durationInSeconds: 0,
    name: '',
    type: '',
    date: null
  };

  constructor() {
  }

  ngOnInit() {
  }

  delete() {
    this.deleteCourse.emit({
      id: this.course.id
    });
  }

}
