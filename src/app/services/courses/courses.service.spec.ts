import { inject, TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import * as moment from 'moment';
import { takeUntil, toArray } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

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

  it('should request initial courses page', inject([ CoursesService ], (service: CoursesService) => {
    service.coursesList.subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(0);
      },
      fail
    );

    const expectedGetUrl = 'http://localhost:3000/courses?date_gte=1970-01-01&name_like=&_limit=2&_page=1&_sort=date&_order=desc';
    const req = httpTestingController.expectOne(expectedGetUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(Array.from(courses.values()));
  }));

  it('should send request on second subscription', inject([ CoursesService ], (service: CoursesService) => {
    service.coursesList.subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(0);
      },
      fail
    );
    service.coursesList.subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(0);
      },
      fail
    );

    const expectedGetUrl = 'http://localhost:3000/courses?date_gte=1970-01-01&name_like=&_limit=2&_page=1&_sort=date&_order=desc';
    const requests: TestRequest[] = httpTestingController.match(expectedGetUrl);
    requests.forEach(req => req.flush(Array.from(courses.values())));
  }));

  it('should request courses page by parameters', inject([ CoursesService ], (service: CoursesService) => {
    service.coursesList.subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(5);
      }, fail
    );

    service.fetchCourses({ courseName: 'basic', courseDate: moment('2010-11-01'), pageIndex: 1 /*zero based*/, pageSize: 3 });

    // initialize service
    const initialGetUrl = 'http://localhost:3000/courses?date_gte=1970-01-01&name_like=&_limit=2&_page=1&_sort=date&_order=desc';
    expect(httpTestingController.expectOne(initialGetUrl).cancelled).toBe(true);
    // request custom page
    const expectedGetUrl = 'http://localhost:3000/courses?date_gte=2010-11-01&name_like=basic&_limit=3&_page=2&_sort=date&_order=desc';
    const expectedRequest = httpTestingController.expectOne(expectedGetUrl);
    expect(expectedRequest.request.method).toEqual('GET');
    expectedRequest.flush(Array.from(courses.values()), { headers: new HttpHeaders().set('X-Total-Count', '5') });
  }));

  it('should cancel initial and repeat courses page request by parameters for multiple subscription',
    inject([ CoursesService ], (service: CoursesService) => {
      // initialize service
      service.coursesList.subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(5);
      }, fail);
      service.coursesList.subscribe((coursesPage) => {
        expect(coursesPage.courses.length).toBe(2);
        expect(coursesPage.totalNumber).toBe(5);
      }, fail);

      service.fetchCourses({ courseName: 'basic', courseDate: moment('2010-11-01'), pageIndex: 1 /*zero based*/, pageSize: 3 });

      const initialGetUrl = 'http://localhost:3000/courses?date_gte=1970-01-01&name_like=&_limit=2&_page=1&_sort=date&_order=desc';
      const expectedGetUrl = 'http://localhost:3000/courses?date_gte=2010-11-01&name_like=basic&_limit=3&_page=2&_sort=date&_order=desc';
      const initialRequests = httpTestingController.match(initialGetUrl);
      expect(initialRequests.length).toBe(2);
      initialRequests.forEach((req: TestRequest) => expect(req.cancelled).toBe(true));
      const expectedRequests = httpTestingController.match(expectedGetUrl);
      expect(expectedRequests.length).toBe(2);
      expectedRequests.forEach((req: TestRequest) => {
        expect(req.request.method).toEqual('GET');
        req.flush(Array.from(courses.values()), { headers: new HttpHeaders().set('X-Total-Count', '5') });
      });
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
    service.savedCourse.subscribe(name => expect(name).toEqual('Any Course'));

    service.saveCourse(newCourse);

    const req = httpTestingController.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  }));

  it('should repeat request for new subscriptions', inject([ CoursesService ], (service: CoursesService) => {
    const newCourse: Course = {
      name: 'Any Course',
      description: 'Introduction to Any Material',
      type: 'text',
      date: moment('2020-01-01').toDate(),
      durationInSeconds: 5400,
      topRated: true,
    };
    service.savedCourse.subscribe(name => expect(name).toEqual('Any Course'));
    service.savedCourse.subscribe(name => expect(name).toEqual('Any Course'));

    service.saveCourse(newCourse);

    httpTestingController.match('http://localhost:3000/courses').forEach((req: TestRequest) => req.flush(newCourse));
  }));

  it('should not cancel \'update\' request after new request', inject([ CoursesService ], (service: CoursesService) => {
    const newCourse: Course = courses.get(1)!;
    const anotherNewCourse: Course = courses.get(3)!;
    const testing: Subject<boolean> = new Subject();
    service.savedCourse.pipe(
      takeUntil(testing),
      toArray()
    ).subscribe(names => {
      expect(names).toEqual([ 'Angular 2 Basics', 'TypeScript Basics' ]);
    });

    service.saveCourse(newCourse);
    service.saveCourse(anotherNewCourse);

    httpTestingController.expectOne('http://localhost:3000/courses/1').flush(newCourse);
    httpTestingController.expectOne('http://localhost:3000/courses/3').flush(anotherNewCourse);
    testing.next();
    testing.unsubscribe();
  }));

  it('should select existing course by id', inject([ CoursesService ], (service: CoursesService) => {
    const existingCourse = courses.get(3)!;
    service.selectedCourse.subscribe((course) => {
      expect(course!).toEqual(existingCourse);
    });

    service.selectCourse(3);

    httpTestingController.expectOne('http://localhost:3000/courses/3').flush(existingCourse);
  }));

  it('should return empty course object', inject([ CoursesService ], (service: CoursesService) => {
    service.selectedCourse.subscribe((course) => {
      expect(course!).toEqual({
        name: '',
        description: '',
        type: '',
        date: moment(0).toDate(),
        durationInSeconds: 0,
        topRated: false,
      });
    });

    service.selectCourse();

    httpTestingController.expectNone('http://localhost:3000/courses/-1');
  }));

  it('should cancel previous select request after new', inject([ CoursesService ], (service: CoursesService) => {
    const existingCourse = courses.get(1)!;
    service.selectedCourse.subscribe((course) => {
      expect(course!).toEqual(existingCourse);
    });

    service.selectCourse(3);
    service.selectCourse(1);

    expect(httpTestingController.expectOne('http://localhost:3000/courses/3').cancelled).toBe(true);
    httpTestingController.expectOne('http://localhost:3000/courses/1').flush(existingCourse);
  }));

  it('should return updated course name', inject([ CoursesService ], (service: CoursesService) => {
    const updatedCourse = courses.get(3)!;

    service.savedCourse.subscribe(name => expect(name).toEqual('TypeScript Basics'));
    service.saveCourse(updatedCourse);

    const updateRequest = httpTestingController.expectOne('http://localhost:3000/courses/3');
    expect(updateRequest.request.method).toEqual('PUT');
    updateRequest.flush(updatedCourse);
  }));

  it('should return deleted course name', inject([ CoursesService ], (service: CoursesService) => {
    const deletedCourse = courses.get(3)!;
    service.deletedCourse.subscribe(name => expect(name).toEqual('TypeScript Basics'));

    service.removeCourse(3);

    const updateRequest = httpTestingController.expectOne('http://localhost:3000/courses/3');
    expect(updateRequest.request.method).toEqual('DELETE');
    updateRequest.flush(deletedCourse);
  }));
});
