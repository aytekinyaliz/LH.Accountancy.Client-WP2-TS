import { CurrentUserActionType, ILoginSuccess } from '../actions/currentUserActions';
import { ICurrentUserState } from '../types/IGlobalState';
import initialStates from './initialStates';
import * as types from '../actions/actionTypes';


type ICurrentUserReducer = (state: ICurrentUserState, action: CurrentUserActionType) => ICurrentUserState | null;

const currentUserReducer: ICurrentUserReducer = (
    state: ICurrentUserState = initialStates.currentUserState,
    action: CurrentUserActionType
): ICurrentUserState | null => {
    switch (action.type) {
        case types.GET_CURRENTUSER:
            return state;
        case types.LOGIN_SUCCESS: {
            return {
                name: (<ILoginSuccess> action).data.name
            };
        }
        case types.LOGOUT_SUCCESS: {
            return null;
        }
        default:
            return state;
    }
};

export default currentUserReducer;
