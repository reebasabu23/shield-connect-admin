type NavigateFunction = (path: any) => void
import { mutations } from '@/lib/api'
import { ROUTES } from '@/lib/constants'
import { FormValues, SubmitHandler } from '@/lib/types/status'
import { toaster } from '@/lib/utils/custom-functions'

export const useStatusFormHelpers = () => {
  const { mutate: createStatus } = mutations.useCreateStatus()
  const { mutate: updateStatus } = mutations.useUpdateStatus()

  const handleSubmit: SubmitHandler = (
    values: FormValues,
    isEdit: boolean,
    avatar: File | null,
    id: string | undefined,
    navigate: NavigateFunction,
    setSubmitting: (isSubmitting: boolean) => void,
    removeAvatar: boolean,
  ) => {
    const formData = new FormData()
    formData.append('caption', values.caption)

    if (removeAvatar) {
      formData.append('remove_avatar', 'true');
      formData.append('type', 'text');
    } else if (avatar instanceof File) {
      formData.append('status', avatar);
      const type = avatar.type.startsWith('video/') ? 'video' : 'image';
      formData.append('type', type);
    } else if (!isEdit) {
      formData.append('type', 'text');
    }
    formData.append('isSponsored', `true`)

    if (isEdit && id) {
      updateStatus(
        { id, data: formData },
        {
          onSuccess: () => {
            toaster('success', 'Status updated successfully')
            navigate(ROUTES.SPONSORED_STATUS)
          },
          onError: () => {
            toaster('error', 'Failed to update Status')
            setSubmitting(false)
          },
        },
      )
    } else {
      createStatus(formData, {
        onSuccess: () => {
          toaster('success', 'Status created successfully')
          navigate(ROUTES.SPONSORED_STATUS)
        },
        onError: () => {
          toaster('error', 'Failed to create Status')
          setSubmitting(false)
        },
      })
    }
  }

  return {
    handleSubmit,
  }
}

