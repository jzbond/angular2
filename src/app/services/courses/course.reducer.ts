import { CourseAction, CourseActionType, SelectedCourseState } from './course.action';

const defaultState: SelectedCourseState = {
  course: null,
};

export function selectedCourseReducer(state: SelectedCourseState = defaultState, action: CourseAction): SelectedCourseState {
  switch (action.type) {
    case CourseActionType.EDIT:
      return {
        ...state,
        course: action.course,
      };

    case CourseActionType.SAVED:
      return {
        ...state,
        course: null,
      };

    default:
      return state;
  }
}
