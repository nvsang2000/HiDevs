import { message } from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const axiosInstance = axios.create({ baseURL })
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
axiosInstance.defaults.timeout = 60000

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = Cookies.get('acc')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  function (error) {
    if (401 == error?.response?.status) {
      Cookies.remove('acc')
    } else {
      const errorSerialize = {
        code: error.response?.status,
        message: Array.isArray(error.response?.data?.message)
          ? error.response?.data?.message?.[0]
          : error.response?.data?.message || error.response?.statusText,
      }

      message.error(errorSerialize.message)
      return Promise.reject(errorSerialize)
    }
  },
)

export const setToken = (token = '') =>
  (axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`)

export default axiosInstance
