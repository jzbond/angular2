import { AuthorizationAction, AuthorizationActionType, AuthorizedState } from './authorization.action';

const defaultState: AuthorizedState = {
  token: {
    id: '',
    token: '',
  },
};

export function authorizationReducer(state: AuthorizedState = defaultState, action: AuthorizationAction): AuthorizedState {
  switch (action.type) {
    case AuthorizationActionType.AUTHORIZE:
      return {
        ...state,
        token: {
          id: action.token.id,
          token: action.token.token,
        },
      };

    case AuthorizationActionType.LOGOUT:
      return {
        ...state,
        token: {
          id: '',
          token: '',
        },
      };

    default:
      return state;
  }
}
