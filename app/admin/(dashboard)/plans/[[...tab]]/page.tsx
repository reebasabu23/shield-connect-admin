'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Col, Container, Row } from 'reactstrap'
import { ROUTES } from '@/lib/constants'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import SvgIcon from '@/app/components/icons/SvgIcon'
import PlansTable from '../PlansTable'
import PlansForm from '../PlansForm'

const Plans = () => {
  const params = useParams()
  const tab = params?.tab?.[0]
  const isAddOrEdit = tab === 'add' || tab === 'edit'

  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: isAddOrEdit ? (tab === 'add' ? 'add_plan' : 'edit_plan') : 'plans',
              subtitle: isAddOrEdit ? 'fill_details_to_manage_plan' : 'view_and_manage_plans',
              headerChildren: !isAddOrEdit && (
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
            {isAddOrEdit ? <PlansForm /> : <PlansTable />}
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default Plans
