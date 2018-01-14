import { inject, TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';

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
    expect(service.listCourses().length).toBeGreaterThan(0);
  }));

  it('should return newly created course', inject([ CoursesService ], (service: CoursesService) => {
    const existingCoursesNumber = service.listCourses().length;
    const newCourse = {
      id: 0,
      name: 'nameNew',
      description: 'descriptionNew',
      type: 'text',
      date: new Date(Date.UTC(2017, 11, 13)),
      durationInSeconds: 30 * 60,
      topRated: false,
    };
    const savedCourse = service.createCourse(newCourse);

    expect(savedCourse.id).toBe(existingCoursesNumber + 1);
    expect(service.listCourses()[ existingCoursesNumber ]).toEqual(savedCourse);
  }));

  it('should return existing course by id', inject([ CoursesService ], (service: CoursesService) => {
    const existingCourse = {
      id: 3,
      name: 'TypeScript Basics',
      description: 'Introduction to TypeScript',
      type: 'video',
      date: new Date(Date.UTC(2018, 4, 10)),
      durationInSeconds: 1.5 * 60 * 60,
      topRated: true,
    };

    const course = service.getCourse(3);

    expect(course).toEqual(existingCourse);
  }));

  it('should return updated course', inject([ CoursesService ], (service: CoursesService) => {
    const updatedCourse = {
      id: 3,
      name: 'TypeScript Basics updated',
      description: 'Introduction to TypeScript updated',
      type: 'video',
      date: new Date(Date.UTC(2018, 5, 15)),
      durationInSeconds: 45 * 60,
      topRated: false,
    };

    const course = service.updateCourse(updatedCourse);

    expect(service.getCourse(updatedCourse.id)).toEqual(updatedCourse);
    expect(service.getCourse(updatedCourse.id)).toEqual(course);
  }));

  it('should return deleted course', inject([ CoursesService ], (service: CoursesService) => {
    const deletedCourse = {
      id: 3,
      name: 'TypeScript Basics',
      description: 'Introduction to TypeScript',
      type: 'video',
      date: new Date(Date.UTC(2018, 4, 10)),
      durationInSeconds: 1.5 * 60 * 60,
      topRated: true,
    };

    const course = service.removeCourse(3);

    expect(course).toEqual(deletedCourse);
    expect(service.getCourse(3)).not.toBeDefined();
  }));
});
