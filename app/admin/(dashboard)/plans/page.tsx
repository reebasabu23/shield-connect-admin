'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import PlansTable from './PlansTable'

const Plans = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'plans',
              subtitle: 'view_and_manage_frequently_asked_questions',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.ADD_PLAN}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Add Plan
                    </SolidButton>
                  </Link>
                </div>
              )
            }}
          >
            <PlansTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Plans
