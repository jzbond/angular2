import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'courses-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output('find') findCourseEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  findCourses(courseParam: string) {
    this.findCourseEmitter.emit({
      name: courseParam,
    });
  }
}
