import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import * as moment from 'moment';

import { Course } from './course';
import { CoursesPage } from './courses-page';
import { CoursesQueryParams } from './courses-query-params';


@Injectable()
export class CoursesService {

  private static readonly SERVER_BASE_URL: String = 'http://localhost:3000';

  private querySubject = new BehaviorSubject<CoursesQueryParams>({
    courseName: '',
    courseDate: moment(0),
    pageSize: 2,
    pageIndex: 0,
  });

  public readonly coursesList: Observable<CoursesPage> = this.querySubject.asObservable()
    .pipe(
      filter(query => query.courseName.length === 0 || query.courseName.length > 2),
      map(query => new HttpParams()
        .set('date_gte', query.courseDate.format('YYYY-MM-DD'))
        .set('name_like', query.courseName)
        .set('_limit', String(query.pageSize))
        .set('_page', String(query.pageIndex + 1))
        .set('_sort', 'date')
        .set('_order', 'desc')
      ),
      switchMap((params: HttpParams) => this.httpClient
        .get<Course[]>(
          `${CoursesService.SERVER_BASE_URL}/courses`,
          {
            observe: 'response',
            responseType: 'json',
            params,
          }
        ).pipe(
          map((response: HttpResponse<Course[]>) => {
            const courses = response.body!.map(course => {
              return {
                id: course.id,
                name: course.name,
                description: course.description,
                type: course.type,
                date: moment(course.date).toDate(),
                durationInSeconds: course.durationInSeconds,
                topRated: course.topRated,
              };
            });
            return {
              totalNumber: parseInt(response.headers.get('X-Total-Count')!) || 0,
              courses: courses,
            };
          }),
        )),
    );

  constructor(private readonly httpClient: HttpClient) {
  }

  public fetchCourses(query: CoursesQueryParams): void {
    this.querySubject.next(query);
  }

  public selectCourse(id?: number): Observable<Course> {
    if (id) {
      return this.httpClient.get<Course>(`${CoursesService.SERVER_BASE_URL}/courses/${id}`);
    } else {
      return observableOf({
        name: '',
        description: '',
        type: '',
        date: moment(0).toDate(),
        durationInSeconds: 0,
        topRated: false,
      });
    }
  }

  public saveCourse(course: Course): Observable<Course> {
    let method = 'POST';
    let url = `${CoursesService.SERVER_BASE_URL}/courses`;
    if (course.id && course.id > -1) {
      method = 'PUT';
      url = `${url}/${course.id}`;
    }
    return this.httpClient.request<Course>(
      method,
      url,
      {
        body: course,
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response',
      }).pipe(
      map((response: HttpResponse<Course>) => {
        return response.body!;
      }),
    );
  }

  public removeCourse(id: number): Observable<Course> {
    return this.httpClient
      .delete<Course>(
        `${CoursesService.SERVER_BASE_URL}/courses/${id}`,
      );
  }
}
