import { ActionReducerMap, createSelector } from '@ngrx/store';

import { AuthorizedState } from './services/auth/authorization.action';
import { ProfileState } from './services/profile/profile.action';
import { SelectedCourseState } from './services/courses/course.action';
import { CoursesListState } from './services/courses/courses.list.action';
import { authorizationReducer } from './services/auth/authorization.reducer';
import { profileReducer } from './services/profile/profile.reducer';
import { selectedCourseReducer } from './services/courses/course.reducer';
import { coursesListReducer } from './services/courses/courses.list.reducer';
import { AuthorizationEffect } from './services/auth/authorization.effect';
import { ProfileEffect } from './services/profile/profile.effect';
import { CourseEffect } from './services/courses/course.effect';
import { CoursesListEffect } from './services/courses/courses.list.effect';

export interface AppState {
  authorized: AuthorizedState;
  profile: ProfileState
  selectedCourse: SelectedCourseState,
  coursesList: CoursesListState,
}

export const appReducers: ActionReducerMap<AppState> = {
  authorized: authorizationReducer,
  profile: profileReducer,
  selectedCourse: selectedCourseReducer,
  coursesList: coursesListReducer,
};

export const appEffects = [
  AuthorizationEffect,
  ProfileEffect,
  CourseEffect,
  CoursesListEffect,
];

const selectAuthorizedState = (state: AppState) => state.authorized;
const selectProfileState = (state: AppState) => state.profile;
const selectCourseState = (state: AppState) => state.selectedCourse;
const coursesListState = (state: AppState) => state.coursesList;
export const selectIsAuthorized = createSelector(selectAuthorizedState, (state: AuthorizedState) => state.token);
export const selectUserProfile = createSelector(selectProfileState, (state: ProfileState) => state.profile);
export const selectCourse = createSelector(selectCourseState, (state: SelectedCourseState) => state.course);
export const selectCoursesList = createSelector(coursesListState, (state: CoursesListState) => state.courses);
export const selectCoursesQueryParams = createSelector(coursesListState, (state: CoursesListState) => state.listParams);

