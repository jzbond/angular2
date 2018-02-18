import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { CoursesService } from '../../../services/courses/courses.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Course } from '../../../services/courses/course';

@Component({
  selector: 'course-editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {

  course: Observable<Course>;

  private subscriptions = new Subject<any>();

  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute,
              private router: Router,
              private notification: NotificationService,) {
  }

  ngOnInit() {
    this.course = this.coursesService.selectedCourse;
    this.coursesService.savedCourse.pipe(takeUntil(this.subscriptions)).subscribe(name => {
      this.notification.show(`Saved ${name} course`);
      this.router.navigate([ '/courses' ]);
    });
    const courseId = this.route.snapshot.paramMap.has('id')
      ? Number(this.route.snapshot.paramMap.get('id'))
      : undefined;
    this.coursesService.selectCourse(courseId);
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.unsubscribe();
  }

  saveCourse(course: Course) {
    this.coursesService.saveCourse(course);
  }

  discard() {
    this.router.navigate([ '/courses' ]);
  }
}
