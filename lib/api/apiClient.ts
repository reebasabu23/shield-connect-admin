import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { getToken } from '@/lib/utils'
import { toaster } from '@/lib/utils/custom-functions'
import { ROUTES } from '@/lib/constants'
import Store from '@/lib/redux/store'
import { logout } from '@/lib/redux/reducers/authSlice'
import { BASE_URL } from '@/lib/constants/url'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

const isTokenOrSessionExpired = (message: string): boolean => {
  const expirationMessages = [
    'Session expired or logged out',
    'Token is invalid or expired',
    'Session expired',
    'Token expired',
    'Please log in again',
  ]

  return expirationMessages.some((expMsg) => message.toLowerCase().includes(expMsg.toLowerCase()))
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.data && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    const responseData = error.response?.data
    const message =
      responseData?.message ||
      responseData?.error ||
      responseData?.details?.[0] ||
      error.message ||
      'Something went wrong'

    if (isTokenOrSessionExpired(message)) {
      Store.dispatch(logout())
      window.location.href = ROUTES.LOGIN
      toaster('error', 'Your session has expired. Please log in again.')
      return Promise.reject(new Error('Session expired'))
    }

    return Promise.reject(error)
  },
)

export default apiClient
