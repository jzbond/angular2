import { async, inject, TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import moment = require('moment');

describe('CoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CoursesService ]
    });
  });

  it('should be created', inject([ CoursesService ], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return courses', inject([ CoursesService ], (service: CoursesService) => {
    service.coursesList.subscribe((courses) => expect(courses.length).toBeGreaterThan(0));
  }));

  it('should return newly created course name', async(inject([ CoursesService ], (service: CoursesService) => {
    const newCourse = {
      id: 0,
      name: 'nameNew',
      description: 'descriptionNew',
      type: 'text',
      date: new Date(Date.UTC(2017, 11, 13)),
      durationInSeconds: 30 * 60,
      topRated: false,
    };

    service.savedCourse.subscribe(name => expect(name).toEqual('nameNew'));
    service.saveCourse(newCourse);
  })));

  it('should return existing course by id', async(inject([ CoursesService ], (service: CoursesService) => {
    const existingCourse = {
      id: 3,
      name: 'TypeScript Basics',
      description: 'Introduction to TypeScript',
      type: 'video',
      date: moment().utc().startOf('day').subtract(14, 'd').toDate(),
      durationInSeconds: 1.5 * 60 * 60,
      topRated: true,
    };

    service.selectedCourse.subscribe((course) => {
      if (course && (course.id != -1)) {
        expect(course).toEqual(existingCourse);
      }
    });
    service.selectCourse(3);
  })));

  it('should return updated course name', async(inject([ CoursesService ], (service: CoursesService) => {
    const updatedCourse = {
      id: 3,
      name: 'TypeScript Basics updated',
      description: 'Introduction to TypeScript updated',
      type: 'video',
      date: new Date(Date.UTC(2018, 5, 15)),
      durationInSeconds: 45 * 60,
      topRated: false,
    };

    service.savedCourse.subscribe(name => expect(name).toEqual('TypeScript Basics updated'));
    service.saveCourse(updatedCourse);
  })));

  it('should return deleted course name', async(inject([ CoursesService ], (service: CoursesService) => {
    service.savedCourse.subscribe(name => expect(name).toEqual('TypeScript Basics'));
    service.removeCourse(3);
  })));
});
