import type { FormikHelpers } from 'formik'
type NavigateFunction = (path: any) => void
import { mutations } from '@/lib/api'
import { ROUTES } from '@/lib/constants'
import type { ReportedAccountsPayload } from '@/lib/types/api'
import type { FormValues, SelectOption } from '@/lib/types/reportedAccounts'
import { toaster } from '@/lib/utils/custom-functions'

export const typeOptions: SelectOption[] = [
  { label: 'Pending', value: 'pending', statusType: 'pending' },
  { label: 'Under Review', value: 'under review', statusType: 'under_review' },
  { label: 'Resolved', value: 'resolved', statusType: 'resolved' },
  { label: 'Dismissed', value: 'dismissed', statusType: 'dismissed' },
  { label: 'Banned', value: 'banned', statusType: 'banned' },
]

export const useReportedAccountsHelpers = () => {
  const { mutate: updateReportedAccounts } = mutations.useUpdateReportedAccounts()

  const handleSubmit = (
    values: FormValues,
    isEdit: boolean,
    id: string | undefined,
    navigate: NavigateFunction,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const payload: ReportedAccountsPayload = {
      status: values.status,
      admin_notes: values.adminNote,
    }

    if (isEdit && id) {
      updateReportedAccounts(
        { id: id, data: payload as ReportedAccountsPayload },
        {
          onSuccess: () => {
            toaster('success', 'ReportedAccounts updated successfully')
            navigate(ROUTES.REPORTED_ACCOUNTS)
            formikHelpers.setSubmitting(false)
          },
          onError: () => {
            toaster('error', 'Failed to update ReportedAccounts')
            formikHelpers.setSubmitting(false)
          },
        },
      )
    }
  }

  return {
    handleSubmit,
  }
}
