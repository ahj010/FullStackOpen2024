import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response =  await axios.get(baseUrl)
  return  response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  // console.log('Sending POST request to create blog:', newObject, config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newBlogObj) => {
  const response = await axios.put(`${baseUrl}/${id}` , newBlogObj )
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, deleteBlog, setToken }
