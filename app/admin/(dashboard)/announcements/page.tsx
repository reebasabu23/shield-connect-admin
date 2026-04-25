'use client'

import Link from 'next/link'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import AnnouncementsTable from './AnnouncementsTable'

const Announcements = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'Announcement',
              subtitle: 'manage_and_view_announcements',
              headerChildren: (
                <div className="action-bar">
                  <Link href={ROUTES.MAKE_ANNOUNCEMENTS}>
                    <SolidButton className="btn-primary">
                      <SvgIcon className="plus-icon" iconId="plus-icon" />
                      Make Announce
                    </SolidButton>
                  </Link>
                </div>
              ),
            }}
          >
            <AnnouncementsTable />
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Announcements
