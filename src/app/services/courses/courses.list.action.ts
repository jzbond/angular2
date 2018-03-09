import { Action } from '@ngrx/store';
import { Moment } from 'moment';

import { CoursesQueryParams } from './courses-query-params';
import { CoursesPage } from './courses-page';


export interface CoursesListState {
  courses: CoursesPage;
  listParams: CoursesQueryParams,
}

export enum CoursesListActionType {
  LIST = '[CoursesList] Show List',
  FETCH = '[CoursesList] Fetch',
  FETCHED = '[CoursesList] List Fetched',
  FILTER_BY_NAME = '[CoursesList] Filter by Name',
  FILTER_BY_DATE = '[CoursesList] Filter by Date',
  COURSES_PAGE = '[CoursesList] Courses Page',
}

export type CoursesListAction =
  ListCourses
  | FetchCoursesList
  | CoursesListFetched
  | FilterCoursesListByName
  | FilterCoursesListByDate
  | CoursesListPage;

export class ListCourses implements Action {
  readonly type = CoursesListActionType.LIST;
}

export class FetchCoursesList implements Action {
  readonly type = CoursesListActionType.FETCH;

  constructor(public coursesQueryParams: CoursesQueryParams) {
  }
}

export class CoursesListFetched implements Action {
  readonly type = CoursesListActionType.FETCHED;

  constructor(public courses: CoursesPage) {
  }
}

export class FilterCoursesListByName implements Action {
  readonly type = CoursesListActionType.FILTER_BY_NAME;

  constructor(public name: string) {
  }
}

export class FilterCoursesListByDate implements Action {
  readonly type = CoursesListActionType.FILTER_BY_DATE;

  constructor(public date: Moment) {
  }
}

export class CoursesListPage implements Action {
  readonly type = CoursesListActionType.COURSES_PAGE;

  constructor(public pageIndex: number, public pageSize: number,) {
  }
}
