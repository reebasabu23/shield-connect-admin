import type { FormikHelpers } from 'formik'


export interface FormValues {
  status: string
  adminNote: string | null
}

export interface SelectOption {
  label: string
  value: string | number
  statusType: string
}

export type SubmitHandler = (
  values: FormValues,
  isEdit: boolean,
  id: string | undefined,
  navigate: any,
  helpers: FormikHelpers<FormValues>,
) => void
