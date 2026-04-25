

export interface FormValues {
  caption: string
  status: string | File | null
}

export type SubmitHandler = (
  values: FormValues,
  isEdit: boolean,
  avatar: File | null,
  id: string | undefined,
  navigate: any,
  setSubmitting: (isSubmitting: boolean) => void,
  removeAvatar: boolean,
) => void
