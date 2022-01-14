import axios from "axios"
import { baseURL } from "./common-api"

// USER
//#region 

export const getOneUserByID = async (token, userID) => {
    try {
        const data = await axios.get(`${baseURL}/user/${userID}`, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getAllUser = async (token) => {
    try {
        const data = await axios.get(baseURL + '/user', {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const createNewUser = async (payload) => {
    try {
        const data = await axios.post(baseURL + '/user/create', payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export const updateUser = async (userID, payload) => {
    try {
        const data = await axios.put(baseURL + '/user/' + userID, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const deleteUser = async (userID) => {
    try {
        const data = await axios.delete(baseURL + '/user/' + userID, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error)) 
    }
}

export const changePasswordUser = async (userID, payload) => {
    try {
        const data = await axios.put(baseURL + '/user/change/password/' + userID, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export const activateUser = async (userID, payload) => {
    try {
        const data = await axios.put(baseURL + '/user/change/active/' + userID, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export const getMenu = async (token, userGroupID) => {
    try {
        const payload = {
            user_group_id_int: userGroupID
        }
        const data = await axios.post(`${baseURL}/login/menu`, payload, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}
//#endregion


// USER GROUP
//#region 
export const getOneUserGroup = async (token, idSeq) => {
    try {
        const data = await axios.get(`${baseURL}/role/${idSeq}`, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getAllUserGroup = async (token) => {
    try {
        const data = await axios.get(baseURL + '/role', {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const createNewUserGroup = async (payload) => {
    try {
        const data = await axios.post(baseURL + '/role/create', payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export const updateUserGroup = async (idSeq, payload) => {
    try {
        const data = await axios.put(baseURL + '/role/' + idSeq, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const deleteUserGroup = async (idSeq) => {
    try {
        const data = await axios.delete(baseURL + '/role/' + idSeq, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error)) 
    }
}
//#endregion