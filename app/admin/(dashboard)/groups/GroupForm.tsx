import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { TextArea, TextInput } from '@/app/components/formFields'
import { SelectImage } from '@/app/components/image'
import { ConfirmModal, FileUploadModal } from '@/app/components/modal'
import type { SingleGroup } from '@/lib/types/api'
import type { FormValues } from '@/lib/types/group'
import { useSelectImage } from '@/lib/utils/hooks/useSelectImage'
import { useGroupFormHelpers, validationSchema } from './useGroupFormHelpers'

const GroupForm = () => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const groupData = (null as any)?.groupData as SingleGroup | undefined
  const { handleSubmit } = useGroupFormHelpers()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

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
  } = useSelectImage({ name: groupData?.name, image: groupData?.avatar || undefined })


  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    description: '',
    avatar: '',
  })
  useEffect(() => {
    if (isEdit && groupData) {
      setInitialValues({
        name: groupData.name,
        description: groupData.description,
        avatar: groupData.avatar || '',
      })
    }
  }, [avatar, isEdit, groupData])

  const handleCancel = () => {
    router.push(ROUTES.GROUPS)
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl="12">
            <CardWrapper
              heading={{
                title: isEdit ? 'edit_group' : 'add_new_group',
                subtitle: isEdit ? 'update_group_information' : '',
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const submitValues = {
                    ...values,
                    avatar: avatar || values.avatar,
                  }
                  handleSubmit(submitValues, isEdit, avatar, id, navigate, setSubmitting, removeAvatar)
                }}
                enableReinitialize
              >
                {({ values, isSubmitting, setFieldValue, errors, touched }) => (
                  <Form>
                    <Row>
                      <Col md="4">
                        <SelectImage
                          name={groupData?.name}
                          image={groupData?.avatar}
                          avatarPreview={avatarPreview}
                          removeAvatar={removeAvatar}
                          hasAvatar={hasAvatar}
                          onClick={() => setIsUploadModalOpen(true)}
                          onAvatarChange={(e) => {
                            onAvatarChange(e)
                            const file = e.target.files?.[0]
                            setFieldValue('avatar', file)
                          }}
                          onRemoveAvatar={() => {
                            onRemoveAvatar()
                            setFieldValue('avatar', null)
                          }}
                          removeBtn={true}
                        />

                        {touched.avatar && errors.avatar && (
                          <div className="text-danger small mt-1">{errors.avatar}</div>
                        )}
                      </Col>
                      <Col md="8">
                        <Row>
                          <Col md="12">
                            <TextInput
                              name="name"
                              label="Name"
                              placeholder="Enter name"
                              value={values.name}
                              onChange={(e) => setFieldValue('name', e.target.value)}
                            />
                          </Col>
                          <Col md="12">
                            <TextArea
                              name="description"
                              label="Description"
                              placeholder="Enter description"
                              value={values.description || ''}
                              onChange={(e) => setFieldValue('description', e.target.value)}
                              formGroupClass="d-flex gap-2"
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
                            {isSubmitting ? 'Saving...' : isEdit ? 'Update Group' : 'Create Group'}
                          </SolidButton>
                        </div>
                      </Col>
                    </Row>
                    <FileUploadModal
                      isOpen={isUploadModalOpen}
                      onClose={() => setIsUploadModalOpen(false)}
                      type="groups"
                      initialCaption={values.name}
                      name={groupData?.name}
                      onSubmit={({ file, caption }) => {
                        if (file) {
                          setAvatar(file)
                          setPreviewUrl(URL.createObjectURL(file))
                          setFieldValue('avatar', file)
                        }
                        if (caption !== undefined) {
                          setFieldValue('name', caption)
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
        title="Remove Picture"
        subtitle={`Are you sure you want to remove picture.`}
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
        showIcon={true}
        iconId="table-delete"
      />
    </>
  )
}

export default GroupForm

