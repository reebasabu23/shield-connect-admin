import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { TextInput } from '@/app/components/formFields'
import type { SingleReportReason } from '@/lib/types/api'
import type { FormValues } from '@/lib/types/ReportSettings'
import { useReportSettingsHelpers, validationSchema } from './useReportSettingsHelpers'

const ReportSettingsForm = () => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const reportSettingsData = (null as any)?.reportSettingsData as SingleReportReason | undefined
  const { handleSubmit } = useReportSettingsHelpers()

  const [initialValues, setInitialValues] = useState<FormValues>({
    title: '',
  })

  useEffect(() => {
    if (isEdit && reportSettingsData) {
      setInitialValues({
        title: reportSettingsData.title,
      })
    }
  }, [isEdit, reportSettingsData])

  const handleCancel = () => {
    router.push(ROUTES.REPORT_SETTINGS)
  }

  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: isEdit ? 'edit_report_settings' : 'add_new_report_settings',
              subtitle: isEdit ? 'update_report_settings_information' : 'create_a_new_frequently_asked_question',
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => handleSubmit(values, isEdit, id, navigate, setSubmitting)}
              enableReinitialize
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col md="12" className="mb-3">
                      <TextInput
                        name="title"
                        label="Title"
                        placeholder="Enter Report"
                        value={values.title}
                        onChange={(e) => setFieldValue('title', e.target.value)}
                      />
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
                          {isSubmitting ? 'Saving...' : isEdit ? 'Update Report' : 'Create Report'}
                        </SolidButton>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default ReportSettingsForm
