import { useQueryClient } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import { type FC } from 'react'
import { Col, Row } from 'reactstrap'
import { mutations, queries } from '@/lib/api'
import { KEYS } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import { PhoneInput, TextInput } from '@/app/components/formFields'
import type { EditProfileFormValues, EditProfileProps } from '@/lib/types/profile'
import { toaster } from '@/lib/utils/custom-functions'
import { nameWithoutSpacesSchema, phoneValidation, yupObject } from '@/lib/utils/validation-schemas'

const EditProfileForm: FC<EditProfileProps & { onCancel: () => void }> = ({
  profileImageFile,
  removeAvatar,
  onCancel,
}) => {
  const queryClient = useQueryClient()
  const { mutate: updateProfile, isPending } = mutations.useUpdateAccountProfile()
  const { data } = queries.useGetUserDetails()

  const handleSubmit = async (values: EditProfileFormValues) => {
    const formData = new FormData()
    formData.append('name', `${values.first_name} ${values.last_name}`)
    formData.append('country_code', values.country_code)
    formData.append('phone', values.phone)
    formData.append('bio', values.bio)

    if (removeAvatar) {
      formData.append('remove_avatar', 'true')
    } else if (profileImageFile instanceof File) {
      formData.append('avatar', profileImageFile)
    }

    updateProfile(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [KEYS.USER] })
        toaster('success', 'Profile updated successfully')
      },
    })
  }

  return (
    <Formik
      initialValues={{
        first_name: data?.user?.name?.split(' ')[0] || '',
        last_name: data?.user?.name?.split(' ')[1] || '',
        country_code: data?.user?.country_code || '',
        phone: data?.user?.phone || '',
        email: data?.user?.email || '',
        bio: data?.user.bio || '',
      }}
      validationSchema={yupObject({
        first_name: nameWithoutSpacesSchema('First Name'),
        last_name: nameWithoutSpacesSchema('Last Name').optional(),
        phone: phoneValidation('country_code'),
      })}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ dirty, handleReset }) => {
        const isChanged = dirty || profileImageFile !== null || removeAvatar

        return (
          <Form className="login-form">
            <Row>
              <Col xs="12" md="6">
                <TextInput className="custom-input" label="first_name" name="first_name" placeholder="enter_firstname" />
              </Col>
              <Col xs="12" md="6">
                <TextInput className="custom-input" label="last_name" name="last_name" placeholder="enter_lastname" />
              </Col>
              <Col xs="12" md="6">
                <TextInput className="custom-input" label="Bio" name="bio" placeholder="Enter Bio" />
              </Col>
            </Row>
            <PhoneInput codeName="country_code" name="phone" label="Phone *" />
            <div className="form-actions">
              <SolidButton
                title="cancel"
                color="outline-light"
                onClick={() => {
                  handleReset()
                  onCancel()
                }}
              />
              <SolidButton
                disabled={!isChanged}
                loading={isPending}
                title="save"
                type="submit"
                color="primary"
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
export default EditProfileForm
