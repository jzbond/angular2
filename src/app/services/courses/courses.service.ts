import { Injectable } from '@angular/core';
import { Course } from './course';
import * as _ from 'lodash';


@Injectable()
export class CoursesService {

  private courses: Map<number, Course>;

  constructor() {
    this.courses = new Map([
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
  }

  public listCourses(): Array<Course> {
    return Array.from(this.courses.values());
  }

  public getCourse(id: number): Course {
    return this.courses.get(id);

  }

  public createCourse(course: Course): Course {
    const savedCourse = _.cloneDeep(course);
    savedCourse.id = this.courses.size + 1;
    this.courses.set(savedCourse.id, savedCourse);
    return savedCourse;
  }

  public updateCourse(course: Course): Course {
    this.courses.set(course.id, course);
    return this.courses.get(course.id);
  }

  public removeCourse(id: number): Course {
    const deleted = this.courses.get(id);

    this.courses.delete(id);

    return deleted;
  }
}
