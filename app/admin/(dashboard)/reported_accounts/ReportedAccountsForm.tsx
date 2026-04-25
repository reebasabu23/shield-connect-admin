import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { Col, Container, Label, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { TextArea } from '@/app/components/formFields'
import SearchableSelect from '@/app/components/formFields/SearchableSelectInput'
import type { SingleReportedAccounts } from '@/lib/types/api'
import type { FormValues, SelectOption } from '@/lib/types/reportedAccounts'
import { typeOptions, useReportedAccountsHelpers } from './useReportedAccountsHelpers'

const ReportedAccountsForm = () => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const reportedAccountsData = (null as any)?.reportedAccountsData as SingleReportedAccounts | undefined
  const { handleSubmit } = useReportedAccountsHelpers()
  const [selectedType, setSelectedType] = useState<SelectOption | null>(typeOptions[2])

  const [initialValues, setInitialValues] = useState<FormValues>({
    status: '',
    adminNote: '',
  })

  useEffect(() => {
    if (isEdit && reportedAccountsData) {
      setInitialValues({
        status: reportedAccountsData.status,
        adminNote: reportedAccountsData.admin_notes,
      })
      const matched = typeOptions.find((opt) => opt.statusType === reportedAccountsData.status)
      setSelectedType(matched ?? typeOptions[2])
    }
  }, [isEdit, reportedAccountsData])

  const handleCancel = () => {
    router.push(ROUTES.REPORTED_ACCOUNTS)
  }

  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: isEdit ? 'edit_reported_accounts' : 'add_new_reported_accounts',
              subtitle: isEdit ? 'update_reported_accounts_information' : 'update_reported_account_information',
            }}
            backBtn={true}
          >
            <Formik
              initialValues={initialValues}
              onSubmit={(values, formikHelpers) => handleSubmit(values, isEdit, id, navigate, formikHelpers)}
              enableReinitialize
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col md="12" className="mb-3">
                      <Label>Status</Label>
                      <SearchableSelect
                        name="status"
                        placeholder="Enter Reported Accounts"
                        options={
                          reportedAccountsData?.chat_type === 'direct'
                            ? typeOptions
                            : typeOptions.filter((item) => item.statusType !== 'banned')
                        }
                        value={selectedType}
                        onChange={(option: SelectOption) => {
                          setSelectedType(option)
                          setFieldValue('status', option.statusType)
                        }}
                        isClearable={false}
                      />
                    </Col>

                    <Col md="12" className="mb-3">
                      <TextArea
                        name="adminNote"
                        label="Admin Note"
                        placeholder="Enter Admin Note"
                        rows={6}
                        value={values.adminNote || ''}
                        onChange={(e) => setFieldValue('adminNote', e.target.value)}
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
                          {isSubmitting ? 'Saving...' : isEdit ? 'Update Reported' : 'Create Reported'}
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

export default ReportedAccountsForm
