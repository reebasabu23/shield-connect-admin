'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import StickersTable from './StickersTable'

const Stickers = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'stickers',
              subtitle: 'view_and_manage_stickers',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.ADD_STICKERS}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Add Stickers
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <StickersTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Stickers
