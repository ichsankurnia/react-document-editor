import axios from "axios";

// export const baseURL = "http://localhost:2299"                          // Local
export const baseURL = 'http://103.77.107.140:2299'

const api = axios.create({
    baseURL: baseURL,
    headers: {
        authorization: `Bearer ${localStorage.getItem("agroo-token")}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

export const authLogin = async (payload) => {
    try {
        const data = await api.post('/api/login', payload)
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const authRegister = async (payload) => {
    try {
        const data = await api.post('/api/register', payload)
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const authValidateOTP = async (payload) => {
    try {
        const data = await api.post('/api/otp-validate', payload)
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export const getProvince = async () => {
    try {
        const {data} = await axios.get(baseURL + '/api/location/prov-all')
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getCities = async (provID) => {
    try {
        const {data} = await axios.get(baseURL + '/api/location/city-prov?prov_id' + provID )
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getAllCities = async () => {
    try {
        const {data} = await axios.get(baseURL + '/api/location/city-all')
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getDistricts = async (cistyID) => {
    try {
        const {data} = await axios.get(baseURL + '/api/location/dis-city?city_id' + cistyID )
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getAllDistricts = async () => {
    try {
        const {data} = await axios.get(baseURL + '/api/location/dis-all')
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const getAllLocation = async () => {
    try {
        const {data} = await axios.get(baseURL + '/api/location/all')
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export default api