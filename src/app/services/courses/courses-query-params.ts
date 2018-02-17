import { Moment } from 'moment';

export interface CoursesQueryParams {
  courseName: string,
  courseDate: Moment,
  pageIndex: number,
  pageSize: number,
}
