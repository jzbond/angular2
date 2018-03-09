import { inject, TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import * as moment from 'moment';

describe('CoursesService', () => {
  let courses: Map<number, Course>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CoursesService ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    courses = new Map([
      [ 1, {
        id: 1,
        name: 'Angular 2 Basics',
        description: 'Introduction to Angular 2',
        type: 'video',
        date: moment('2019-01-01').toDate(),
        durationInSeconds: 9000,
        topRated: true
      } ],
      [ 3, {
        id: 3,
        name: 'TypeScript Basics',
        description: 'Introduction to TypeScript',
        type: 'video',
        date: moment('2019-03-01').toDate(),
        durationInSeconds: 5400,
        topRated: true
      } ],
    ]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([ CoursesService ], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should request courses page by parameters', inject([ CoursesService ], (service: CoursesService) => {
    service.fetchCourses({
      courseName: 'basic',
      courseDate: moment('2010-11-01'),
      pageIndex: 1 /*zero based*/,
      pageSize: 3
    }).subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(5);
      }, fail
    );

    const expectedGetUrl = 'http://localhost:3000/courses?date_gte=2010-11-01&name_like=basic&_limit=3&_page=2&_sort=date&_order=desc';
    const expectedRequest = httpTestingController.expectOne(expectedGetUrl);
    expect(expectedRequest.request.method).toEqual('GET');
    expectedRequest.flush(Array.from(courses.values()), { headers: new HttpHeaders().set('X-Total-Count', '5') });
  }));

  it('should return newly created course name', inject([ CoursesService ], (service: CoursesService) => {
    const newCourse: Course = {
      name: 'Any Course',
      description: 'Introduction to Any Material',
      type: 'text',
      date: moment('2020-01-01').toDate(),
      durationInSeconds: 5400,
      topRated: true,
    }!;

    service.saveCourse(newCourse).subscribe(course => expect(course.name).toEqual('Any Course'));

    const req = httpTestingController.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  }));

  it('should select existing course by id', inject([ CoursesService ], (service: CoursesService) => {
    const existingCourse = courses.get(3)!;

    service.selectCourse(3).subscribe((course) => {
      expect(course!).toEqual(existingCourse);
    });

    httpTestingController.expectOne('http://localhost:3000/courses/3').flush(existingCourse);
  }));

  it('should return empty course object', inject([ CoursesService ], (service: CoursesService) => {
    service.selectCourse().subscribe((course) => {
      expect(course!).toEqual({
        name: '',
        description: '',
        type: '',
        date: moment(0).toDate(),
        durationInSeconds: 0,
        topRated: false,
      });
    });

    httpTestingController.expectNone('http://localhost:3000/courses/-1');
  }));

  it('should return updated course name', inject([ CoursesService ], (service: CoursesService) => {
    const updatedCourse = courses.get(3)!;

    service.saveCourse(updatedCourse).subscribe(course => expect(course.name).toEqual('TypeScript Basics'));

    const updateRequest = httpTestingController.expectOne('http://localhost:3000/courses/3');
    expect(updateRequest.request.method).toEqual('PUT');
    updateRequest.flush(updatedCourse);
  }));

  it('should return deleted course name', inject([ CoursesService ], (service: CoursesService) => {
    const deletedCourse = courses.get(3)!;

    service.removeCourse(3).subscribe(course => expect(course.id).toEqual(3));

    const updateRequest = httpTestingController.expectOne('http://localhost:3000/courses/3');
    expect(updateRequest.request.method).toEqual('DELETE');
    updateRequest.flush(deletedCourse);
  }));
});
