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