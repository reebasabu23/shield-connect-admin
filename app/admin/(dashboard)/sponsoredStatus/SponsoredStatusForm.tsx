import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { Col, Container, Row } from 'reactstrap'
import { queries } from '@/lib/api'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { TextInput } from '@/app/components/formFields'
import { SelectImage } from '@/app/components/image'
import { ConfirmModal, FileUploadModal } from '@/app/components/modal'
import { FormValues } from '@/lib/types/status'
import { useSelectImage } from '@/lib/utils/hooks/useSelectImage'
import Loader from '@/app/components/table/TableLoader'
import { useStatusFormHelpers } from './useStatusFormHelpers'

const SponsoredStatusForm = () => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { data: statusData, isLoading: isFetching } = queries.useGetSponsoredStatusById(id)
  const { handleSubmit } = useStatusFormHelpers()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const validationSchema = Yup.object().shape({
    caption: Yup.string()
      .max(150, 'Caption cannot exceed 150 characters')
      .test('min-length', 'Caption must be at least 50 characters', (value) => {
        if (!value || value.length === 0) return true
        return value.length >= 50
      }),
    status: Yup.mixed().required('A status image or video is required'),
  })

  const {
    avatarPreview,
    removeAvatar,
    confirmRemoveMemberOpen,
    avatar,
    hasAvatar,
    setConfirmRemoveMemberOpen,
    confirmRemoveAvatar,
    onAvatarChange,
    onRemoveAvatar,
    setAvatar,
    setPreviewUrl,
  } = useSelectImage({ name: 's', image: statusData?.status?.file_url || '' })

  const initialValues: FormValues = {
    caption: statusData?.status?.caption || '',
    status: statusData?.status?.file_url || '',
  }

  const handleCancel = () => {
    router.push(ROUTES.SPONSORED_STATUS)
  }

  if (isFetching) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Loader />
      </div>
    )
  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col xl="12">
            <CardWrapper
              heading={{
                title: isEdit ? 'edit_status' : 'add_new_status',
                subtitle: 'update_status_information',
              }}
            >
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  const submitValues = {
                    ...values,
                    status: avatar || values.status,
                  }
                  handleSubmit(submitValues, isEdit, avatar, id, navigate, setSubmitting, removeAvatar)
                }}
                validationSchema={validationSchema}
                enableReinitialize
              >
                {({ values, isSubmitting, setFieldValue, errors, touched }) => (
                  <Form>
                    <Row>
                      <Col md="4">
                        <SelectImage
                          onClick={() => setIsUploadModalOpen(true)}
                          accept="image/*,video/*"
                          avatarPreview={avatarPreview}
                          removeAvatar={removeAvatar}
                          hasAvatar={hasAvatar}
                          isvideo={avatar?.type.startsWith('video/') || (typeof values.status === 'string' && (values.status.endsWith('.mp4') || values.status.endsWith('.mov')))}
                          onAvatarChange={(e) => {
                            onAvatarChange(e)
                            const file = e.target.files?.[0]
                            setFieldValue('status', file)
                          }}
                          onRemoveAvatar={() => {
                            onRemoveAvatar()
                            setFieldValue('status', null)
                          }}
                          removeBtn={hasAvatar}
                        />

                        {touched.status && errors.status && (
                          <div className="text-danger small mt-1">{errors.status}</div>
                        )}
                      </Col>
                      <Col md="8">
                        <Row>
                          <Col md="12">
                            <TextInput
                              name="caption"
                              label="Caption"
                              placeholder="Enter Status Caption"
                              value={values.caption}
                              onChange={(e) => setFieldValue('caption', e.target.value)}
                              maxLength={150}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs="12">
                        <div className="d-flex gap-2 flex-wrap justify-content-end">
                          <SolidButton
                            type="button"
                            color="light"
                            className="btn-light"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </SolidButton>
                          <SolidButton type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : isEdit ? 'Update Status' : 'Create Status'}
                          </SolidButton>
                        </div>
                      </Col>
                    </Row>
                    <FileUploadModal
                      isOpen={isUploadModalOpen}
                      onClose={() => setIsUploadModalOpen(false)}
                      type="status"
                      initialCaption={values.caption}
                      name={statusData?.status?.caption}
                      onSubmit={({ file, caption }) => {
                        if (file) {
                          setAvatar(file)
                          setPreviewUrl(URL.createObjectURL(file))
                          setFieldValue('status', file)
                        }
                        if (caption !== undefined) {
                          setFieldValue('caption', caption)
                        }
                        setIsUploadModalOpen(false)
                      }}
                    />

                  </Form>
                )}
              </Formik>
            </CardWrapper>
          </Col>
        </Row>
      </Container>
      <ConfirmModal
        isOpen={confirmRemoveMemberOpen}
        onClose={() => {
          setConfirmRemoveMemberOpen(false)
        }}
        onConfirm={confirmRemoveAvatar}
        title="Remove Status"
        subtitle={`Are you sure you want to remove status.`}
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
        showIcon={true}
        iconId="table-delete"
      />
    </>
  )
}

export default SponsoredStatusForm

