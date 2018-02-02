import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'courses-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: [ './toolbar.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @Output() find = new EventEmitter();
  @Output() add = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  findCourses(courseParam: string) {
    this.find.emit({
      name: courseParam,
    });
  }

  addCourse() {
    this.add.emit();
  }
}
