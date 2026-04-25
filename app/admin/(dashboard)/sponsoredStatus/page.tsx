'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import SponsoredStatusTable from './SponsoredStatusTable'

const SponsoredStatus = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'Sponsored Status',
              subtitle: 'view_and_manage_sponsored_status',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.ADD_SPONSORED_STATUS}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Add Status
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <SponsoredStatusTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default SponsoredStatus
