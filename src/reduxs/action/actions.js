export const ActionType = {
    SET_USER_DATA: "SET_USER_DATA",
    UPDATE_USER_DATA: "UPDATE_USER_DATA",
    SET_DATETIME_NOW: "SET_DATETIME_NOW",
    SET_COLLAPSE: "SET_COLLAPSE",
    SET_USER_ROLE_LIST: 'SET_USER_ROLE_LIST'
}

export const setUserData = (payload) => {
    return {
        type: ActionType.SET_USER_DATA,
        payload: payload
    }
}

export const updateUserData = (key, value) => {
    return {
        type: ActionType.UPDATE_USER_DATA,
        key: key,
        value: value
    }
}

export const setUserRoleList = (data) => {
    return {
        type: ActionType.SET_USER_ROLE_LIST,
        data: data
    }
}

export const setTimeNow = (momentTime) => {
    return {
        type: ActionType.SET_DATETIME_NOW,
        data: momentTime
    }
}

export const setCollapse = (value) => {
    return {
        type: ActionType.SET_COLLAPSE,
        value: value
    }
}