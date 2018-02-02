import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../../services/courses/course';

@Component({
  selector: 'course-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<Course>();
  @Input() course: Course;

  constructor() {
  }

  ngOnInit() {
  }

  saveCourse() {
    this.save.emit(this.course);
  }

  discard() {
    this.cancel.emit();
  }

}
