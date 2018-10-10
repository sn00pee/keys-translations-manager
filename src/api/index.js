import axios from 'axios'
import * as config from '../../ktm.config'

const { hostname, port } = config.server
const Url =  `http://${hostname}:${port}`

const getActiveProjects = () => {
  return axios.get(`${Url}/api/count/projects`)
}

const getProjects = () => {
  return new Promise(resolve => resolve({
    data: config.projects
  }))
}

const getTranslations = (project) => {
  return axios.get(`${Url}/api/vis/json/${project}`)
}

const updateTranslation = (_id, translation) => {
  return axios.put(`${Url}/api/translation/${_id}`, translation)
}
export {
  getTranslations,
  getActiveProjects,
  getProjects,
  updateTranslation
}
