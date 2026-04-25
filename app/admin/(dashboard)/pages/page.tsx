'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import PagesTable from './PagesTable'

const Pages = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'manage_pages',
              subtitle: 'view_and_manage_pages',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.ADD_PAGE}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Add Page
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <PagesTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Pages
