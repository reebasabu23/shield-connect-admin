'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import ReportSettingsTable from './ReportSettingsTable'

const ReportSettings = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'manage_report_settings',
              subtitle: 'view_and_manage_report',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.ADD_REPORT_SETTINGS}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Add Report
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <ReportSettingsTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default ReportSettings
