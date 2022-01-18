import axios from 'axios'
import { baseURL } from './common-api'

export const getAllParamConfig = async () => {
    try {
        const data = await axios.get(baseURL + '/setting', {
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

export const createNewParamConfig = async (payload) => {
    try {
        const data = await axios.post(baseURL + '/setting/create', payload, {
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

export const updateParamConfig = async (configID, payload) => {
    try {
        const data = await axios.put(baseURL + '/setting/' + configID, payload, {
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

export const deleteParamConfig = async (configID) => {
    try {
        const data = await axios.delete(baseURL + '/setting/' + configID, {
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

export const updateStatusParamConfig = async (configID, payload) => {
    try {
        const data = await axios.put(baseURL + '/setting/change/active/' + configID, payload, {
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