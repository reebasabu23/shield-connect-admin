import { useTranslation } from 'react-i18next'
import { mutations, queries } from '@/lib/api'
import { ROUTES } from '@/lib/constants'
import CommonTable from '@/app/components/table'
import TableWrapper from '@/lib/utils/hoc/TableWrapper'
import { useTableManager } from '@/lib/utils/hooks/useTablemanager'
import { useState } from 'react'
import { ConfirmModal } from '@/app/components/modal'
import { toaster } from '@/lib/utils/custom-functions'
import { COLUMN_TYPE } from '@/lib/types/constants'
import Link from 'next/link'
import SvgIcon from '@/app/components/icons/SvgIcon'
import type { Action, Column, TableConfig } from '@/lib/types/shared'
import type { SingleReportReason } from '@/lib/types/api'

const ReportSettingsTable = () => {
  const { pagination: basePagination, search, params, sort } = useTableManager()
  const { data, isLoading, refetch, isRefetching } = queries.useGetReportSettings(params)
  const { mutate } = mutations.useDeleteReportSettings()
  const { t } = useTranslation()
  const [tableKey, setTableKey] = useState(0)
  const [, setLoadingStates] = useState<Record<string, boolean>>({})

  const pagination = {
    ...basePagination,
    total: data?.total || 0,
  }

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    isLoading: false,
    onConfirm: () => {},
    title: '',
    subtitle: '',
    confirmText: 'confirm',
    variant: 'default' as 'default' | 'danger' | 'warning' | 'success' | 'info',
    iconId: '',
  })

  const showConfirmModal = (config: Partial<typeof confirmModal>) => {
    setConfirmModal((prev) => ({
      ...prev,
      isOpen: true,
      ...config,
    }))
  }

  const hideConfirmModal = () => {
    setConfirmModal((prev) => ({
      ...prev,
      isOpen: false,
      isLoading: false,
    }))
  }

  const columns: Column<SingleReportReason>[] = [
    {
      title: 'Title',
      sortable: true,
      sortField: 'title',
      dataField: [
        {
          field: 'title',
          renderer: (data) => (
            <div className="report-settings-des">
              <div className="report-settings-data">
                <h6>{data?.title}</h6>
                <div className="report-settings-answer">
                  <span className="text-truncate" style={{ maxWidth: '300px', display: 'block' }}>
                    {data?.description}
                  </span>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      title: 'created_at',
      sortable: true,
      sortField: 'created_at',
      dataField: [
        {
          type: COLUMN_TYPE.Date,
          field: 'created_at',
          dateformatOptions: { showDate: true, showTime: false },
        },
      ],
    },
    {
      title: 'updated_at',
      sortable: true,
      sortField: 'updated_at',
      dataField: [
        {
          type: COLUMN_TYPE.Date,
          field: 'updated_at',
          dateformatOptions: { showDate: true, showTime: false },
        },
      ],
    },
  ]

  const actionsDropDown: (Action<SingleReportReason> | string)[] = [
    {
      label: 'edit',
      actionToPerform: 'edit',
      renderer: (row) => (
        <Link
          href={ROUTES.EDIT_REPORT_SETTINGS.replace(':id', row.id.toString())}
          
          className="edit-icon-box"
        >
          <SvgIcon iconId="table-edit" />
        </Link>
      ),
    },
    'delete',
  ]

  const handleActionPerform = async ({
    actionToPerform,
    data,
  }: {
    actionToPerform: string
    data: SingleReportReason
  }) => {
    const loadingKey = `${actionToPerform}-${data.id}`

    try {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: true }))

      if (actionToPerform === 'delete') {
        showConfirmModal({
          variant: 'danger',
          iconId: 'table-delete',
          title: 'Delete Report',
          subtitle: 'Are you sure you want to delete this Report? This action cannot be undone.',
          confirmText: t('delete'),
          onConfirm: async () => {
            setConfirmModal((prev) => ({ ...prev, isLoading: true }))
            mutate(
              { ids: [data.id] },
              {
                onSuccess: () => {
                  toaster('success', 'Report deleted successfully')
                  hideConfirmModal()
                  setTableKey((prev) => prev + 1)
                  refetch()
                },
                onError: () => {
                  toaster('error', 'Failed to delete Report')
                  setConfirmModal((prev) => ({ ...prev, isLoading: false }))
                },
              },
            )
          },
        })
        return
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: false }))
    }
  }

  const handleBulkActions = (action: string, selectedReportSetting: SingleReportReason[]) => {
    if (action === 'delete' && selectedReportSetting.length > 0) {
      showConfirmModal({
        variant: 'danger',
        iconId: 'table-delete',
        title: t('delete_report_setting_title'),
        subtitle: `${t('delete_multiple_report_setting_description', { count: selectedReportSetting.length })}`,
        confirmText: t('delete'),
        onConfirm: () => {
          setConfirmModal((prev) => ({ ...prev, isLoading: true }))
          mutate(
            { ids: selectedReportSetting.map((user) => user.id) },
            {
              onSuccess: () => {
                toaster('success', t('report_setting_deleted_successfully', { count: selectedReportSetting.length }))
                hideConfirmModal()
                refetch()
              },
              onError: () => {
                toaster('error', t('failed_to_delete_report_settings'))
                setConfirmModal((prev) => ({ ...prev, isLoading: false }))
              },
            },
          )
        },
      })
    }
  }

  const config: TableConfig<SingleReportReason> = {
    columns,
    data: data?.reports || [],
    actionsDropDown,
    total: data?.total,
  }

  return (
    <>
      <TableWrapper pagination={pagination} search={search} handleBulkActions={handleBulkActions} showDelete={true}>
        <CommonTable
          key={tableKey}
          isLoading={isLoading}
          isRefetching={isLoading || isRefetching}
          tableConfiguration={config}
          onActionPerform={handleActionPerform}
          sort={sort}
        />
      </TableWrapper>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={hideConfirmModal}
        onConfirm={confirmModal.onConfirm}
        isLoading={confirmModal.isLoading}
        variant={confirmModal.variant}
        title={confirmModal.title}
        subtitle={confirmModal.subtitle}
        confirmText={confirmModal.confirmText}
        loadingText="Processing..."
        iconId={confirmModal.iconId}
      />
    </>
  )
}

export default ReportSettingsTable
