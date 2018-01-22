import { Injectable } from '@angular/core';
import { Course } from './course';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CoursesService {
  static readonly COURSE_TOKEN = 'courseId';

  private coursesMap: Map<number, Course>;
  private coursesSubject = new Rx.BehaviorSubject<Array<Course>>([]);
  private courseName: string;
  private outdatedTime: Moment;

  courses: Observable<Array<Course>> = this.coursesSubject.asObservable();

  constructor() {
    this.coursesMap = new Map([
      [ 1, {
        id: 1,
        name: 'Angular 2 Basics',
        description: 'Introduction to Angular 2',
        type: 'video',
        date: new Date(Date.UTC(2018, 0, 11)),
        durationInSeconds: 2.5 * 60 * 60,
        topRated: false,
      } ],
      [ 2, {
        id: 2,
        name: 'Angular Materials Basics',
        description: 'Introduction to Angular Materials',
        type: 'video',
        date: new Date(Date.UTC(2017, 11, 15)),
        durationInSeconds: 0.75 * 60 * 60,
        topRated: false,
      } ],
      [ 3, {
        id: 3,
        name: 'TypeScript Basics',
        description: 'Introduction to TypeScript',
        type: 'video',
        date: new Date(Date.UTC(2018, 4, 10)),
        durationInSeconds: 1.5 * 60 * 60,
        topRated: true,
      } ],
      [ 4, {
        id: 4,
        name: 'JavaScript Basics',
        description: 'Introduction to JavaScript',
        type: 'video',
        date: new Date(Date.UTC(2017, 2, 8)),
        durationInSeconds: 2.5 * 60 * 60,
        topRated: false,
      } ],
    ]);
    Observable.timer(2000).do(() => this.setVisibleCourses()).subscribe();
  }

  public filterCourses(courseName?: string, outdatedTime?: Moment): Observable<Course[]> {
    this.courseName = courseName;
    this.outdatedTime = outdatedTime;
    return this.setVisibleCourses(false);
  }

  public getCourse(id: number): Observable<Course> {
    return Observable.of(this.coursesMap.get(id))
      .delay(500)
      ;
  }

  public createCourse(course: Course): Observable<Course> {
    const savedCourse = _.cloneDeep(course);
    savedCourse.id = this.coursesMap.size + 1;
    return Observable.of(savedCourse)
      .delay(500)
      .do((savedCourse) => this.coursesMap.set(savedCourse.id, savedCourse))
      .do(() => this.setVisibleCourses())
      ;
  }

  public updateCourse(course: Course): Observable<Course> {
    return Observable.of(course)
      .delay(500)
      .do((updatedCourse) => this.coursesMap.set(updatedCourse.id, updatedCourse))
      .do(() => this.setVisibleCourses())
      ;
  }

  public removeCourse(id: number): Observable<Course> {
    return Observable.of(this.coursesMap.get(id))
      .delay(500)
      .do(() => this.coursesMap.delete(id))
      .do(() => this.setVisibleCourses())
      ;
  }

  private setVisibleCourses(subscribe: boolean = true): Observable<Course[]> {
    const observable = Observable.from(Array.from(this.coursesMap.values()))
      .filter((course) => !this.courseName || course.name.toLowerCase().includes(this.courseName.toLowerCase()))
      .filter((course) => !this.outdatedTime || moment(course.date).isSameOrAfter(this.outdatedTime))
      .map((course: Course) => {
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
      .toArray()
      .do(courses => this.coursesSubject.next(courses))
    ;
    if (subscribe) {
      observable.subscribe();
      return Observable.empty();
    }
    return observable;
  }

  requestNewCourseData(id?: number): Observable<number> {
    return Observable.of(id)
      .do(() => localStorage.setItem(CoursesService.COURSE_TOKEN, JSON.stringify({ id })))
      ;
  }

  cancelNewCourseData(): Observable<boolean> {
    return Observable.of(true)
      .do(() => localStorage.removeItem(CoursesService.COURSE_TOKEN))
      ;
  }

  getCourseTokenValue(): number {
    return JSON.parse(localStorage.getItem(CoursesService.COURSE_TOKEN)).id;
  }

  hasCourseToken(): boolean {
    return localStorage.getItem(CoursesService.COURSE_TOKEN) != null;
  }
}
