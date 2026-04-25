'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import LanguagesTable from './LanguagesTable'

const Languages = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'manage_languages',
              subtitle: 'view_and_manage_languages',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.ADD_LANGUAGE}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Add Language
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <LanguagesTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Languages

