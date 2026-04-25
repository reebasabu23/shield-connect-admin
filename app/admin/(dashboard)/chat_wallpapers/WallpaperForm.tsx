import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { SwitchInput, TextInput } from '@/app/components/formFields'
import { SelectImage } from '@/app/components/image'
import { ConfirmModal, FileUploadModal } from '@/app/components/modal'
import type { SingleWallpaper } from '@/lib/types/api'
import type { FormValues } from '@/lib/types/wallpaper'
import { useSelectImage } from '@/lib/utils/hooks/useSelectImage'
import { useWallpaperFormHelpers, validationSchema } from './useWallpaperFormHelpers'
import EditWallpaperError from './EditWallpaperError'

const WallpaperForm = () => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const wallpaperData = (null as any)?.wallpaperData as SingleWallpaper | undefined
  const { handleSubmit } = useWallpaperFormHelpers()
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
  } = useSelectImage({ name: wallpaperData?.name, image: wallpaperData?.wallpaper })
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    wallpaper: '',
    statusSwitch: true,
  })
  useEffect(() => {
    if (isEdit && wallpaperData) {
      setInitialValues({
        name: wallpaperData.name,
        wallpaper: wallpaperData.wallpaper || '',
        statusSwitch: wallpaperData.status === true,
      })
    }
  }, [avatar, isEdit, wallpaperData])

  const handleCancel = () => {
    router.push(ROUTES.CHAT_WALLPAPERS)
  }

  if (isEdit && !wallpaperData) {
    return <EditWallpaperError />
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl="12">
            <CardWrapper
              heading={{
                title: isEdit ? 'edit_wallpaper' : 'add_new_wallpaper',
                subtitle: isEdit ? 'update_wallpaper_information' : 'create_a_new_frequently_asked_question',
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const submitValues = {
                    ...values,
                    wallpaper: avatar || values.wallpaper,
                  }
                  handleSubmit(submitValues, isEdit, avatar, id, navigate, setSubmitting, removeAvatar)
                }}
                enableReinitialize
              >
                {({ values, isSubmitting, setFieldValue, errors, touched }) => (
                  <Form>
                    <Row className="row">
                      <Col md="4" className="mb-3 mt-3">
                        <SelectImage
                          onClick={() => setIsUploadModalOpen(true)}
                          name={wallpaperData?.name || 'W'}
                          image={wallpaperData?.wallpaper}
                          avatarPreview={avatarPreview}
                          removeAvatar={removeAvatar}
                          hasAvatar={hasAvatar}
                          onAvatarChange={(e) => {
                            onAvatarChange(e)
                            const file = e.target.files?.[0]
                            setFieldValue('wallpaper', file)
                          }}
                          onRemoveAvatar={() => {
                            onRemoveAvatar()
                            setFieldValue('wallpaper', null)
                          }}
                          removeBtn={false}
                        />
                        {touched.wallpaper && errors.wallpaper && (
                          <div className="text-danger small mt-1">{errors.wallpaper}</div>
                        )}
                      </Col>
                      <Col md="8" className="mb-3 mt-3">
                        <Row>
                          <Col md="12">
                            <TextInput
                              name="name"
                              label="Name"
                              placeholder="Enter Wallpaper name"
                              value={values.name}
                              onChange={(e) => setFieldValue('name', e.target.value)}
                            />
                          </Col>

                          <Col md="6" className="mt-3">
                            <SwitchInput
                              name="statusSwitch"
                              label="Status"
                              layout="horizontal"
                              onToggle={(checked) => {
                                setFieldValue('statusSwitch', checked)
                                setFieldValue('status', checked ? 'active' : 'inactive')
                              }}
                              formGroupClass="d-flex align-items-center gap-2"
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
                            {isSubmitting ? 'Saving...' : isEdit ? 'Update Wallpaper' : 'Create Wallpaper'}
                          </SolidButton>
                        </div>
                      </Col>
                    </Row>
                    <ConfirmModal
                      isOpen={confirmRemoveMemberOpen}
                      onClose={() => {
                        setConfirmRemoveMemberOpen(false)
                      }}
                      onConfirm={confirmRemoveAvatar}
                      title="Remove Profile Picture"
                      subtitle={`Are you sure you want to remove profile picture.`}
                      confirmText="Remove"
                      cancelText="Cancel"
                      variant="danger"
                      showIcon={true}
                      iconId="table-delete"
                    />
                    <FileUploadModal
                      isOpen={isUploadModalOpen}
                      onClose={() => setIsUploadModalOpen(false)}
                      type="wallpaper"
                      name={wallpaperData?.name}
                      onSubmit={({ file, caption }) => {
                        if (file) {
                          setAvatar(file)
                          setPreviewUrl(URL.createObjectURL(file))
                          setFieldValue('wallpaper', file)
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
    </>
  )
}

export default WallpaperForm
