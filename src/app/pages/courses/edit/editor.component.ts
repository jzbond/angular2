import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

import { Course } from '../../../services/courses/course';
import { SaveCourse } from '../../../services/courses/course.action';
import { AppState, selectCourse } from '../../../app.reducers';
import { ListCourses } from '../../../services/courses/courses.list.action';

@Component({
  selector: 'course-editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {

  course: Observable<Course>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.course = this.store.pipe(
      select(selectCourse),
      filter((course: Course) => course != null),
    );
  }

  saveCourse(course: Course) {
    this.store.dispatch(new SaveCourse(course));
  }

  discard() {
    this.store.dispatch(new ListCourses());
  }
}
