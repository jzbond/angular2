import { ProfileAction, ProfileActionType, ProfileState } from './profile.action';

const emptyProfile: ProfileState = {
  profile: {
    id: '',
    name: '',
    surname: '',
  },
};

export function profileReducer(state: ProfileState = emptyProfile, action: ProfileAction) {
  switch (action.type) {
    case ProfileActionType.USER:
      return {
        ...state,
        profile: {
          id: action.user.id,
          name: action.user.name,
          surname: action.user.surname,
        },
      };

    case ProfileActionType.NO_PROFILE:
      return {
        ...state,
        profile: {
          id: '',
          name: '',
          surname: '',
        },
      };

    default:
      return state;
  }
}

