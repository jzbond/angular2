import { async, inject, TestBed } from '@angular/core/testing';

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
    service.filterCourses().subscribe((courses) => expect(courses.length).toBeGreaterThan(0));
  }));

  it('should return newly created course', async(inject([ CoursesService ], (service: CoursesService) => {
    const newCourse = {
      id: 0,
      name: 'nameNew',
      description: 'descriptionNew',
      type: 'text',
      date: new Date(Date.UTC(2017, 11, 13)),
      durationInSeconds: 30 * 60,
      topRated: false,
    };
    service.filterCourses().subscribe((courses) => {
      let existingCoursesNumber = courses.length;
      service.createCourse(newCourse).subscribe((course) => {
        expect(course.id).toBe(existingCoursesNumber + 1);
        service.getCourse(existingCoursesNumber + 1).subscribe((courseById) => expect(courseById).toEqual(course));
      });
    });
  })));

  it('should return existing course by id', async(inject([ CoursesService ], (service: CoursesService) => {
    const existingCourse = {
      id: 3,
      name: 'TypeScript Basics',
      description: 'Introduction to TypeScript',
      type: 'video',
      date: new Date(Date.UTC(2018, 4, 10)),
      durationInSeconds: 1.5 * 60 * 60,
      topRated: true,
    };

    service.getCourse(3).subscribe((course) => expect(course).toEqual(existingCourse));
  })));

  it('should return updated course', async(inject([ CoursesService ], (service: CoursesService) => {
    const updatedCourse = {
      id: 3,
      name: 'TypeScript Basics updated',
      description: 'Introduction to TypeScript updated',
      type: 'video',
      date: new Date(Date.UTC(2018, 5, 15)),
      durationInSeconds: 45 * 60,
      topRated: false,
    };
    service.getCourse(updatedCourse.id).subscribe((course) => expect(course).not.toEqual(updatedCourse));

    service.updateCourse(updatedCourse).subscribe((course) => {
      service.getCourse(updatedCourse.id).subscribe((courseById) => {
        expect(courseById).toEqual(updatedCourse);
        expect(courseById).toEqual(course);
      });
    });
  })));

  it('should return deleted course', async(inject([ CoursesService ], (service: CoursesService) => {
    const deletedCourse = {
      id: 3,
      name: 'TypeScript Basics',
      description: 'Introduction to TypeScript',
      type: 'video',
      date: new Date(Date.UTC(2018, 4, 10)),
      durationInSeconds: 1.5 * 60 * 60,
      topRated: true,
    };

    service.getCourse(deletedCourse.id).subscribe((course) => expect(course).toEqual(deletedCourse));

    service.removeCourse(3).subscribe((course) => {
      expect(course).toEqual(deletedCourse);
      service.getCourse(3).subscribe((course) => expect(course).toBeUndefined());
    });
  })));
});
