import axios from "axios"
import { baseURL } from "./common-api"

// USER
//#region 
export const getOneUser = async (token, phoneNumber) => {
    try {
        const data = await axios.get(`${baseURL}/api/user/get-one?phone_number_int=${phoneNumber}`, {
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

export const getOneUserByID = async (token, userID) => {
    try {
        const data = await axios.get(`${baseURL}/api/user/get-one?id_seq=${userID}`, {
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
        const data = await axios.get(baseURL + '/api/user/get-all', {
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
        const data = await axios.post(baseURL + '/api/user/create', payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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
        const data = await axios.patch(baseURL + '/api/user/update/' + userID, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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
        const data = await axios.delete(baseURL + '/api/user/delete/' + userID, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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

export const disableUser = async (userID) => {
    try {
        const data = await axios.delete(baseURL + '/api/user/disable/' + userID, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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
        const data = await axios.post(`${baseURL}/api/login/menu`, payload, {
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
        const data = await axios.get(`${baseURL}/api/usergroup/get-one?id_seq=${idSeq}`, {
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
        const data = await axios.get(baseURL + '/api/usergroup/get-all', {
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
        const data = await axios.post(baseURL + '/api/usergroup/create', payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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
        const data = await axios.patch(baseURL + '/api/usergroup/update/' + idSeq, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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
        const data = await axios.delete(baseURL + '/api/usergroup/delete/' + idSeq, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ties-token")}`,
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