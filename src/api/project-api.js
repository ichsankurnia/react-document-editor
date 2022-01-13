import axios from 'axios'
import { baseURL } from './common-api'

export const getAllProject = async () => {
    try {
        const data = await axios.get(baseURL + '/project/get-all', {
            headers: {
                authorization: `Bearer ${localStorage.getItem("agroo-token")}`,
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

export const createNewProject = async (payload) => {
    try {
        const data = await axios.post(baseURL + '/project/create', payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("agroo-token")}`,
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

export const updateProject = async (projectID, payload) => {
    try {
        const data = await axios.patch(baseURL + '/project/update/' + projectID, payload, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("agroo-token")}`,
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

export const deleteProject = async (projectID) => {
    try {
        const data = await axios.delete(baseURL + '/project/delete/' + projectID, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("agroo-token")}`,
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