import axios from "axios"

const baseURL = '/api/persons'

const getAll =  () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseURL , newPerson)
    return request.then(response => response.data)
}

const deletePerson =  (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
   return request.then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default {getAll , create , deletePerson, updatePerson}
