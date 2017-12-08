import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courses-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  courseParam: string;

  constructor() {
    this.courseParam = 'Enter name fragment or date...';
  }

  ngOnInit() {
  }

  findCourses() {
    console.log(`searching for course: ${this.courseParam}`);
  }

}
