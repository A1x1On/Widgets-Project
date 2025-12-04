import axios from 'axios'

const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT
const WIDGET_URL = `localhost:${BACKEND_PORT}`
const WIDGET_BASE_URL = `http://${WIDGET_URL}`

const instance = axios.create({
  baseURL: WIDGET_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    if (!config.url?.startsWith('http')) {
      config.baseURL = WIDGET_BASE_URL
    }

    if (config.url?.includes(WIDGET_URL)) {
      config.baseURL = ''
    }

    // let method = config.method?.toUpperCase()
    let fullUrl = ''
    let url = config.url
    if (config?.baseURL) {
      fullUrl = config.baseURL + config.url
      url = `${config.baseURL}${config.url}`
    }

    // console.log('Axios Request from Widget:', { method, url, fullUrl })

    return config
  },
  (error) => {
    console.error('Axios Request Error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', {
      status: response.status,
      url: response.config.url,
      from: WIDGET_BASE_URL,
    })
    return response
  },
  (error) => {
    console.error('Axios Response Error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      message: error.message,
    })
    return Promise.reject(error)
  },
)

export default instance
