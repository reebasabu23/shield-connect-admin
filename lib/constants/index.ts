import { KEYS } from './keys'
import { STORAGE_KEYS } from './storageKeys'
import { ROUTES } from './routes'
import { URL_KEYS } from './url'
import { HTTP_STATUS } from './httpStatus'

export const Href: string = '#Javascript'
export const ImagePath: string = '/assets/images'
export const ImageBaseUrl = (process.env.NEXT_PUBLIC_STORAGE_URL?.endsWith('/')
  ? process.env.NEXT_PUBLIC_STORAGE_URL
  : `${process.env.NEXT_PUBLIC_STORAGE_URL}/`)

export { ROUTES, URL_KEYS, STORAGE_KEYS, HTTP_STATUS, KEYS }
