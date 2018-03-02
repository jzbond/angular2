import { Action } from '@ngrx/store';

import { Course } from './course';
import { CoursesQueryParams } from './courses-query-params';


export interface CoursesState {
  courses: Course[];
  queryParams: CoursesQueryParams;
}

export enum CoursesActionType {
  LIST = '[Courses] List',
}

export type CoursesAction = ListCourses;

export class ListCourses implements Action {
  readonly type = CoursesActionType.LIST;
}
