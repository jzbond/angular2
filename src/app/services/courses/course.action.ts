import { Action } from '@ngrx/store';

import { Course } from './course';


export interface SelectedCourseState {
  course: Course | null;
}

export enum CourseActionType {
  SELECT = '[Courses] Select',
  NEW = '[Courses] New',
  EDIT = '[Courses] Edit',
  SAVE = '[Courses] Save',
  SAVED = '[Courses] Saved',
  DELETE = '[Courses] Delete',
  DELETED = '[Courses] Deleted',
}

export type CourseAction =
  SelectCourse
  | NewCourse
  | EditCourse
  | SaveCourse
  | SavedCourse
  | DeleteCourse
  | DeletedCourse;

export class SelectCourse implements Action {
  readonly type = CourseActionType.SELECT;

  constructor(public courseId: number) {
  }
}

export class NewCourse implements Action {
  readonly type = CourseActionType.NEW;
}

export class EditCourse implements Action {
  readonly type = CourseActionType.EDIT;

  constructor(public course: Course) {
  }
}

export class SaveCourse implements Action {
  readonly type = CourseActionType.SAVE;

  constructor(public course: Course) {
  }
}

export class SavedCourse implements Action {
  readonly type = CourseActionType.SAVED;

  constructor(public course: Course) {
  }
}

export class DeleteCourse implements Action {
  readonly type = CourseActionType.DELETE;

  constructor(public courseId: number) {
  }
}

export class DeletedCourse implements Action {
  readonly type = CourseActionType.DELETED;

  constructor(public courseId: number) {
  }
}
