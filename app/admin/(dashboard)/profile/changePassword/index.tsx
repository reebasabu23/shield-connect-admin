import { Form, Formik, type FormikHelpers } from 'formik'
import { Col, Container, Row } from 'reactstrap'
import { mutations } from '@/lib/api'
import { useAppSelector } from '@/lib/redux/hooks'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { TextInput } from '@/app/components/formFields'
import type { UpdatePasswordFormValues } from '@/lib/types/profile'
import { toaster } from '@/lib/utils/custom-functions'
import { updatePasswordSchema } from '@/lib/utils/validation-schemas'

const ChangePassword = () => {
  const { user } = useAppSelector((store) => store.auth)
  const { mutate, isPending } = mutations.useUpdatePassword()

  const handleSubmit = (values: UpdatePasswordFormValues, { resetForm }: FormikHelpers<UpdatePasswordFormValues>) => {
    mutate(
      {
        password: values?.new_password,
        old_password: values?.old_password,
      },
      {
        onSuccess: () => {
          resetForm()
          toaster('success', 'Password updated successfully.')
        },
        onError: (error) => {
          toaster('error', error.message || 'Failed to update password')
        },
      },
    )
  }

  return (
    <Col xl="12">
      <CardWrapper
        heading={{
          title: 'change_password',
          subtitle: `One Password for all the teams connected with ${user?.email}`,
        }}
      >
        <Formik
          initialValues={{
            new_password: '',
            confirm_password: '',
            old_password: '',
          }}
          validationSchema={updatePasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className="login-form">
              <Container fluid>
                <Row>
                  <Col md="4">
                    <TextInput
                      label="old_password"
                      iconProps={{ iconId: 'stroke-Verification', className: 'form-icon' }}
                      name="old_password"
                      placeholder="*********"
                      type="password"
                    />
                  </Col>
                  <Col md="4">
                    <TextInput
                      label="new_password"
                      iconProps={{ iconId: 'stroke-Verification', className: 'form-icon' }}
                      name="new_password"
                      placeholder="*********"
                      type="password"
                    />
                  </Col>
                  <Col md="4">
                    <TextInput
                      label="confirm_password"
                      iconProps={{ iconId: 'stroke-Verification', className: 'form-icon' }}
                      name="confirm_password"
                      type="password"
                      placeholder="*********"
                    />
                  </Col>
                </Row>
              </Container>
              <div className="d-flex form-actions">
                <SolidButton title="cancel" className="Login-btn btn-outline-light" onClick={() => resetForm()} />
                <SolidButton loading={isPending} title="save" type="submit" color="primary" />
              </div>
            </Form>
          )}
        </Formik>
      </CardWrapper>
    </Col>
  )
}

export default ChangePassword
