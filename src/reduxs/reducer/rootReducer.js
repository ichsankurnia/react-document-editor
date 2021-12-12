import { ActionType } from "../action/actions";
import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_USER_DATA:
            const user = {...state.user}
            for (const key in action.payload) {
                user[key] = action.payload[key]
            }
            return {
                ...state,
                user: user
            }
        case ActionType.UPDATE_USER_DATA:
            const userUpdate = { ...state.user}
            userUpdate[action.key] = action.value
            return {
                ...state,
                user: userUpdate
            }
        case ActionType.SET_USER_ROLE_LIST:
            return{
                ...state,
                user_role_list: action.data
            }
        case ActionType.SET_COLLAPSE:
            return {
                ...state,
                collapse: action.value
            }
        default:
            return state
    }
}

export default rootReducer