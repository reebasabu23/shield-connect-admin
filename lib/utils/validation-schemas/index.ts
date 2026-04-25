import * as Yup from 'yup'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import { countryCodes } from '@/lib/data/shared'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9]{7,15}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const passwordMessage = 'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number and one special character'

const getIsoByCode = (code: string) => {
  if (!code) return undefined
  const cleanCode = code.startsWith('+') ? code : `+${code}`
  return countryCodes.find((c) => c.code === cleanCode)?.iso as CountryCode
}

export const loginValidationSchema = Yup.object({
  identifier: Yup.string()
    .required('Email or phone number is required')
    .test('is-email-or-phone', 'Please enter a valid email address or phone number (7-15 digits)', function (value) {
      return !!value && (emailRegex.test(value) || phoneRegex.test(value))
    }),
  password: Yup.string().matches(passwordRegex, passwordMessage).required('Password is required'),
})

export const yupObject = <T extends Record<string, Yup.AnySchema>>(schemaObject: T) => {
  return Yup.object().shape(schemaObject)
}

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().matches(passwordRegex, passwordMessage).required('Password is required'),
})

export const emailSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
})

export const otpSchema = Yup.object().shape({
  otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
})

export const confirmPasswordSchema = Yup.object().shape({
  password: Yup.string().matches(passwordRegex, passwordMessage).required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Password doesn't match")
    .required('Confirm Password is required'),
})

export const nameSchema = (fieldLabel: string = 'Field') => Yup.string().required(`${fieldLabel} is required`)

export const passwordValidation = Yup.string()
  .required('Password is required')
  .matches(passwordRegex, passwordMessage)

export const nameWithoutSpacesSchema = (fieldLabel: string = 'Field') =>
  Yup.string().required(`${fieldLabel} is required`).matches(/^\S+$/, `${fieldLabel} should not contain spaces`)

export const phoneSchema = Yup.string().required('Phone number is required')

export const phoneValidation = (countryCodeField: string = 'country_code') =>
  Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number for the selected country', function (value) {
      const countryCode = this.parent[countryCodeField]
      if (!value || !countryCode) return true

      const iso = getIsoByCode(countryCode)
      if (!iso) return true // If we can't find the ISO, we can't validate strictly, so we fall back to general check

      try {
        const phoneNumber = parsePhoneNumberFromString(value, iso)
        return phoneNumber ? phoneNumber.isValid() : false
      } catch {
        return false
      }
    })

export const emailValidation = Yup.string().email('Please enter a valid email address').required('Email is required')

export const updatePasswordSchema = Yup.object().shape({
  old_password: nameSchema('Old Password'),
  new_password: Yup.string().matches(passwordRegex, passwordMessage).required('New Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), undefined], "Password doesn't match")
    .required('Confirm Password is required'),
})

export const plansValidationSchema = Yup.object({
  name: Yup.string()
    .required('Plan name is required')
    .min(3, 'Plan name must be at least 3 characters')
    .max(100, 'Plan name must not exceed 100 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Plan name must contain only alphabets'),
  slug: Yup.string()
    .required('Slug is required')
    .matches(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must not exceed 100 characters'),
  description: Yup.string().max(2000, 'Description must not exceed 2000 characters'),
  price_per_user_per_month: Yup.number()
    .required('Monthly price is required')
    .min(0, 'Price must be greater than or equal to 0')
    .typeError('Price must be a valid number'),
  price_per_user_per_year: Yup.number()
    .nullable()
    .min(0, 'Price must be greater than or equal to 0')
    .typeError('Price must be a valid number'),
  billing_cycle: Yup.string()
    .oneOf(['monthly', 'yearly', 'both'], 'Invalid billing cycle')
    .required('Billing cycle is required'),
  max_members_per_group: Yup.number()
    .required('Max members per group is required')
    .min(1, 'Max members per group must be at least 1')
    .integer('Max members per group must be an integer')
    .typeError('Max members per group must be a valid number'),
  max_broadcasts_list: Yup.number()
    .required('Max broadcasts list is required')
    .min(1, 'Max broadcasts list must be at least 1')
    .integer('Max broadcasts list must be an integer')
    .typeError('Max broadcasts list must be a valid number'),
  max_members_per_broadcasts_list: Yup.number()
    .required('Max members per broadcast list is required')
    .min(1, 'Max members per broadcast list must be at least 1')
    .integer('Max members per broadcast list must be an integer')
    .typeError('Max members per broadcast list must be a valid number'),
  max_status: Yup.number()
    .required('Max status is required')
    .min(0, 'Max status must be at least 1')
    .integer('Max status must be an integer')
    .typeError('Max status must be a valid number'),
  max_groups: Yup.number()
    .required('Max groups is required')
    .min(0, 'Max groups must be greater than or equal to 0')
    .integer('Max groups must be an integer')
    .typeError('Max groups must be a valid number'),
  allows_file_sharing: Yup.boolean(),
  display_order: Yup.number()
    .min(0, 'Display order must be greater than or equal to 0')
    .integer('Display order must be an integer')
    .typeError('Display order must be a valid number'),
  is_default: Yup.boolean(),
  trial_period_days: Yup.number()
    .min(0, 'Trial period must be greater than or equal to 0')
    .integer('Trial period must be an integer')
    .typeError('Trial period must be a valid number'),
  statusSwitch: Yup.boolean(),
})
