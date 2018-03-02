import * as moment from 'moment';

import { CoursesAction, CoursesActionType, CoursesState } from './courses.action';

const defaultState: CoursesState = {
  courses: [],
  queryParams: {
    courseDate: moment(),
    courseName: '',
    pageIndex: 0,
    pageSize: 2,
  }
};

export function selectedCourseReducer(state: CoursesState = defaultState, action: CoursesAction): CoursesState {
  switch (action.type) {
    case CoursesActionType.LIST:
      return {
        ...state,
      };

    default:
      return state;
  }
}
