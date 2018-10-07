import config from '../../ktm.config.js'
import axios from 'axios'

const { hostname, port } = config.server
const api =  `http://${hostname}:${port}`

const getActiveProjects = () => {
  return axios.get(`${api}/api/count/projects`)
}

const getProjects = () => {
  return new Promise(resolve => resolve({
    data: config.projects
  }))
}

export {
  getActiveProjects,
  getProjects
}
