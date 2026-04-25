import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mutations, queries } from '@/lib/api'
import { ROUTES } from '@/lib/constants'
import { Avatar } from '@/app/components/image'
import { ConfirmModal } from '@/app/components/modal'
import CommonTable from '@/app/components/table'
import type { SingleGroup } from '@/lib/types/api'
import { COLUMN_TYPE } from '@/lib/types/constants'
import type { Action, Column, TableConfig } from '@/lib/types/shared'
import { toaster } from '@/lib/utils/custom-functions'
import TableWrapper from '@/lib/utils/hoc/TableWrapper'
import { useTableManager } from '@/lib/utils/hooks/useTablemanager'
import Link from 'next/link'
import SvgIcon from '@/app/components/icons/SvgIcon'

const GroupTable = () => {
  const { pagination: basePagination, search, params, sort } = useTableManager()
  const { data, isLoading, refetch, isRefetching } = queries.useGetGroups(params)
  const { mutate } = mutations.useDeleteGroups()
  const { t } = useTranslation()
  const [, setLoadingStates] = useState<Record<string, boolean>>({})
  const [tableKey, setTableKey] = useState(0)

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

  const columns: Column<SingleGroup>[] = [
    {
      title: 'group_name',
      sortable: true,
      sortField: 'name',
      dataField: [
        {
          field: 'name',
          renderer: (data) => {
            return (
              <div className="group-des">
                <Avatar data={{ avatar: data.avatar }} name={{ name: data.name }} />
                <div className="group-data">
                  <h6>{data?.name}</h6>
                  <span>{data?.description || '-'}</span>
                </div>
              </div>
            )
          },
        },
      ],
    },
    {
      title: 'creator',
      sortable: true,
      sortField: 'creator',
      dataField: [
        {
          field: 'creator',
          renderer: (data) => (
            <div className="group-des">
              <Avatar data={{ avatar: data.creator?.avatar }} name={{ name: data.creator?.name }} />
              <div className="group-data">
                <h6>{data?.creator?.name}</h6>
                <span>{data?.creator?.email}</span>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      title: 'members',
      sortable: true,
      sortField: 'member_count',
      dataField: [
        {
          field: 'member_count',
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
  ]

  const actionsDropDown: (Action<SingleGroup> | string)[] = [
    {
      label: 'view',
      getNavigateUrl: (row) => {
        return ROUTES.MANAGE_MEMBERS.replace(':id', row.id.toString())
      },
    },
    {
      label: 'edit',
      actionToPerform: 'edit',
      renderer: (row: SingleGroup) => {
        return (
          <Link
            href={ROUTES.EDIT_GROUP.replace(':id', row.id.toString())}
            
            className="edit-icon-box"
          >
            <SvgIcon iconId="table-edit" />
          </Link>
        )
      },
    },
    'delete',
  ]

  const handleActionPerform = async ({
    actionToPerform,
    data,
  }: {
    actionToPerform: string
    data: (SingleGroup & { action: string; user_id?: string }) | { action: string; user_id?: string }
  }) => {
    const rowId = (data as SingleGroup)?.id
    const loadingKey = `${actionToPerform}-${rowId}-${data.action}`

    try {
      setLoadingStates((prev) => ({ ...prev, [loadingKey]: true }))

      if (actionToPerform === 'delete') {
        const teamToDelete = data as SingleGroup

        showConfirmModal({
          variant: 'danger',
          iconId: 'table-delete',
          title: t('delete_group'),
          subtitle: `${t('delete_group_description')}`,
          confirmText: t('delete'),
          onConfirm: async () => {
            setConfirmModal((prev) => ({ ...prev, isLoading: true }))
            mutate(
              { ids: [teamToDelete.id] },
              {
                onSuccess: () => {
                  toaster('success', t('group_deleted_successfully'))
                  hideConfirmModal()
                  setTableKey((prev) => prev + 1)
                  refetch()
                },
                onError: (error) => {
                  console.error('Delete error:', error)
                  toaster('error', t('failed_to_delete_group'))
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

  const handleBulkActions = (action: string, selectedTeams: SingleGroup[]) => {
    if (action === 'delete' && selectedTeams.length > 0) {
      showConfirmModal({
        variant: 'danger',
        iconId: 'table-delete',
        title: t('delete_groups'),
        subtitle: `${t('delete_multiple_groups_description', { count: selectedTeams.length })}`,
        confirmText: t('delete'),
        onConfirm: () => {
          setConfirmModal((prev) => ({ ...prev, isLoading: true }))
          mutate(
            { ids: selectedTeams.map((user) => user.id) },
            {
              onSuccess: () => {
                toaster('success', t('groups_deleted_successfully', { count: selectedTeams.length }))
                hideConfirmModal()
                refetch()
              },
              onError: (error) => {
                console.error('Delete error:', error)
                toaster('error', t('failed_to_delete_groups'))
                setConfirmModal((prev) => ({ ...prev, isLoading: false }))
              },
            },
          )
        },
      })
    }
  }

  const config: TableConfig<SingleGroup> = {
    columns,
    data: data?.groups || [],
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
        loadingText={t('processing')}
        iconId={confirmModal.iconId}
      />
    </>
  )
}

export default GroupTable
