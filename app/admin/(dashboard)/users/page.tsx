'use client'

import { Col, Container, Row } from 'reactstrap'
import CardWrapper from '@/app/components/card/CardWrapper'
import UsersTable from './UsersTable'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import SvgIcon from '@/app/components/icons/SvgIcon'

const Users = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'all_users',
              subtitle: 'view_and_control_user_access_and_permissions',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.CREATE_USER}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Create User
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <UsersTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Users
