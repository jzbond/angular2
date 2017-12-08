import {Injectable} from '@angular/core';
import {Course} from './course';

@Injectable()
export class CoursesService {

  constructor() {
  }

  public listCourses(): Array<Course> {
    return [
      {
        id: 1,
        name: 'Angular 2 Basics',
        description: 'Introduction to Angular 2',
        type: 'video',
        date: new Date(),
        durationInSeconds: 2.5 * 60 * 60,
      },
      {
        id: 2,
        name: 'Angular Materials Basics',
        description: 'Introduction to Angular Materials',
        type: 'video',
        date: new Date(),
        durationInSeconds: 0.75 * 60 * 60,
      },
      {
        id: 3,
        name: 'TypeScript Basics',
        description: 'Introduction to TypeScript',
        type: 'video',
        date: new Date(),
        durationInSeconds: 1.5 * 60 * 60,
      }
    ];
  }

}
