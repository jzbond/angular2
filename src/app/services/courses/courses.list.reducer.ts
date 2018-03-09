import * as moment from 'moment';

import { CoursesListAction, CoursesListActionType, CoursesListState } from './courses.list.action';

const defaultState: CoursesListState = {
  courses: {
    courses: [],
    totalNumber: 0,
  },
  listParams: {
    courseDate: moment(0),
    courseName: '',
    pageIndex: 0,
    pageSize: 2,
  }
};

export function coursesListReducer(state: CoursesListState = defaultState, action: CoursesListAction): CoursesListState {
  switch (action.type) {
    case CoursesListActionType.FILTER_BY_DATE:
      return {
        ...state,
        listParams: {
          courseDate: action.date,
          courseName: state.listParams.courseName,
          pageIndex: 0,
          pageSize: state.listParams.pageSize,
        }
      };

    case CoursesListActionType.FILTER_BY_NAME:
      const courseName = action.name.length === 0 || action.name.length > 2
        ? action.name
        : state.listParams.courseName;
      return {
        ...state,
        listParams: {
          courseDate: state.listParams.courseDate,
          courseName: courseName,
          pageIndex: 0,
          pageSize: state.listParams.pageSize,
        }
      };

    case CoursesListActionType.COURSES_PAGE:
      return {
        ...state,
        listParams: {
          courseDate: state.listParams.courseDate,
          courseName: state.listParams.courseName,
          pageIndex: action.pageIndex,
          pageSize: action.pageSize,
        }
      };

    case CoursesListActionType.FETCHED:
      return {
        ...state,
        courses: action.courses,
      };

    default:
      return state;
  }
}
