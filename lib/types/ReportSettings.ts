

export interface FormValues {
  title: string
}

export type SubmitHandler = (
  values: FormValues,
  isEdit: boolean,
  id: string | undefined,
  navigate: any,
  setSubmitting: (isSubmitting: boolean) => void,
) => void
