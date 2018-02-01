import { Injectable } from '@angular/core';
import { Course } from './course';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Observable';
import { delay, map, share, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/timer';


@Injectable()
export class CoursesService {

  private coursesMap: Map<number, Course>;
  private courseName: string;
  private outdatedTime: Moment;

  private filterSubject = new ReplaySubject<string>();
  private selectedCourseSubject = new ReplaySubject<number | null>(0);
  private deletedCourseSubject = new Subject<number>();
  private savedCourseSubject = new Subject<Course>();

  public readonly coursesList: Observable<Course[]> = this.filterSubject.asObservable()
    .pipe(
      tap(filter => this.courseName = filter),
      map(filter => Array.from(this.coursesMap.values())
        .filter((course) => !this.courseName || course.name.toLowerCase().includes(this.courseName))
        .filter((course) => !this.outdatedTime || moment(course.date).isSameOrAfter(this.outdatedTime))
      ),
    );

  public readonly selectedCourse: Observable<Course | null> = this.selectedCourseSubject.asObservable()
    .pipe(
      map((id) => {
        if (id) {
          return this.coursesMap.get(id) || {
              id: -1,
              name: '',
              description: '',
              type: '',
              date: moment(0).toDate(),
              durationInSeconds: 0,
              topRated: false,
            };
        }
        return null;
      }),
    );

  public readonly savedCourse: Observable<string> = this.savedCourseSubject.asObservable()
    .pipe(
      map((course) => {
        if (course.id > 0) {
          const savedCourse = _.cloneDeep(course);
          savedCourse.id = this.coursesMap.size + 1;
          return savedCourse;
        }
        return course;
      }),
      delay(500),// emulate initial http request
      map(savedCourse => {
        this.coursesMap.set(savedCourse.id, savedCourse);
        return savedCourse.name;
      }),
      tap(() => this.selectedCourseSubject.next(null)),
      tap(() => this.filterSubject.next(this.courseName)),
      share(),
    );

  public readonly deletedCourse: Observable<string> = this.deletedCourseSubject.asObservable()
    .pipe(
      delay(500),// emulate initial http request
      map(id => {
        const course = this.coursesMap.get(id);
        this.coursesMap.delete(id);
        return course ? course.name : '';
      }),
      tap(() => this.filterSubject.next(this.courseName)),
      share(),
    );

  constructor() {
    this.coursesMap = new Map();
    this.courseName = '';
  }

  public initCourses(outdatedTime?: Moment): void {
    this.filterSubject.next('');
    this.outdatedTime = outdatedTime || moment(0);
    // emulate initial http request
    Observable.timer(2000).pipe(
      tap(() => {
        const currentDate: Moment = moment().utc().startOf('day');
        [
          {
            id: 1,
            name: 'Angular 2 Basics',
            description: 'Introduction to Angular 2',
            type: 'video',
            date: currentDate.clone().subtract(1, 'd').toDate(),
            durationInSeconds: 2.5 * 60 * 60,
            topRated: true,
          }, {
          id: 2,
          name: 'Angular Materials Basics',
          description: 'Introduction to Angular Materials',
          type: 'video',
          date: currentDate.clone().add(2, 'M').toDate(),
          durationInSeconds: 0.75 * 60 * 60,
          topRated: false,
        }, {
          id: 3,
          name: 'TypeScript Basics',
          description: 'Introduction to TypeScript',
          type: 'video',
          date: currentDate.clone().subtract(14, 'd').toDate(),
          durationInSeconds: 1.5 * 60 * 60,
          topRated: true,
        }, {
          id: 4,
          name: 'JavaScript Basics',
          description: 'Introduction to JavaScript',
          type: 'video',
          date: currentDate.clone().subtract(15, 'd').toDate(),
          durationInSeconds: 2.5 * 60 * 60,
          topRated: false,
        } ]
          .map(course => {
            return {
              id: course.id,
              name: course.name,
              description: course.description,
              type: course.type,
              date: course.date,
              durationInSeconds: course.durationInSeconds,
              topRated: course.topRated,
            };
          })
          .map(course => this.coursesMap.set(course.id, course));

      }),
      tap(() => this.filterSubject.next('')),
    ).subscribe();
  }

  public filterCourses(courseName?: string): void {
    this.filterSubject.next(courseName ? courseName.toLowerCase() : '');
  }

  public selectCourse(id?: number): void {
    this.selectedCourseSubject.next(id || -1);
  }

  public saveCourse(course: Course): void {
    this.savedCourseSubject.next(course);
  }

  public removeCourse(id: number): void {
    this.deletedCourseSubject.next(id);
  }

  public cancel(): void {
    this.selectedCourseSubject.next(null);
  }
}
