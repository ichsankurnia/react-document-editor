import axios from "axios"
import { baseURL } from "./common-api"

export const syncfusionURL = 'https://ej2services.syncfusion.com/production/web-services'

export const convertDocxToSFDT = async () => {
    try {
        const data = await axios.post(`${syncfusionURL}/api/documenteditor/Import`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getAllDocument = async () => {
    try {
        const data = await axios.get(baseURL + '/document', {
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

export const getOneDocument = async (docID) => {
    try {
        const data = await axios.get(baseURL + '/document/id/' + docID, {
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

export const getDocumentByUser = async (approvalStatus) => {
    try {
        const payload = {
            "b_approve": approvalStatus
        }
        const data = await axios.post(baseURL + '/document/user', payload, {
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

export const getTemplateDocument = async (docName) => {
    try {
        const data = await axios.get(baseURL + '/document/template/' + docName, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("doc-token")}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            responseType: 'blob'
        })
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const createNewDocument = async (payload) => {
    try {
        const data = await axios.post(baseURL + '/document/create', payload, {
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

export const updateDocument = async (docID, payload) => {
    try {
        const data = await axios.patch(baseURL + '/document/' + docID, payload, {
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

export const deleteDocument = async (docID) => {
    try {
        const data = await axios.delete(baseURL + '/document/' + docID, {
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

export const approveDocument = async (payload) => {
    try {
        const data = await axios.post(baseURL + '/document/approve', payload, {
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