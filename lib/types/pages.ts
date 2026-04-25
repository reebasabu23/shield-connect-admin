import type { FormikHelpers } from 'formik'

import type { CreatePagePayload } from './api'

export type FormValues = CreatePagePayload

export interface SelectOption {
  label: string
  value: string | number
}

export type SubmitHandler = (
  values: FormValues,
  isEdit: boolean,
  id: string | undefined,
  navigate: any,
  helpers: FormikHelpers<FormValues>,
) => void
