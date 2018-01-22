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
  @Output() save = new EventEmitter();
  @Input() course: Course;

  constructor() {
  }

  ngOnInit() {
  }

  saveCourse() {
    this.save.emit({
      id: null,
      description: null,
    });
  }

  discard() {
    this.cancel.emit();
  }

}
