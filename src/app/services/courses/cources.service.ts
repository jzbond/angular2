import {Injectable} from '@angular/core';
import {Course} from './course';

@Injectable()
export class CourcesService {

  constructor() {
  }

  public listCourses(): Array<Course> {
    return [
      {
        name: 'Angular 2',
        description: 'Introduction to Angular 2',
        type: 'video',
        date: new Date(),
        durationInSeconds: 2*60*60,
      },
      {
        name: 'Angular Materials',
        description: 'Introduction to Angular Materials',
        type: 'video',
        date: new Date(),
        durationInSeconds: 1*60*60,
      },
      {
        name: 'TypeScript',
        description: 'Introduction to TypeScript',
        type: 'video',
        date: new Date(),
        durationInSeconds: 2*60*60,
      }
    ];
  }

}
