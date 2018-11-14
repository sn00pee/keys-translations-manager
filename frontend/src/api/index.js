import axios from 'axios'
import * as config from './../../../ktm.config'

const { hostname, port } = config.server
const Url = `http://${hostname}:${port}`

const getActiveProjects = () => axios.get('/api/count/projects')

const getProjects = () => new Promise(resolve => resolve({
  data: config.projects
}))

const getHost = () => {
  return Url
}

const getTranslations = project => axios.get(`/api/vis/json/${project}`)

const updateTranslation = (_id, translation) => axios.put(`/api/translation/${_id}`, translation)

export {
  getTranslations,
  getActiveProjects,
  getProjects,
  updateTranslation
}
