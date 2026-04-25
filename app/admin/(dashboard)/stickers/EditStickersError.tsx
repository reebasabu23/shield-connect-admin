import { useRouter } from 'next/navigation'
import { Col, Container, Row } from 'reactstrap'
import { SolidButton } from '@/app/components/button/SolidButton'
import CardWrapper from '@/app/components/card/CardWrapper'
import { ROUTES } from '@/lib/constants'

const EditStickersError = () => {
  const router = useRouter()
  const navigate = (path: any) => router.push(path)
  return (
    <Container fluid>
      <Row>
        <Col xl="12">
          <CardWrapper
            heading={{
              title: 'edit_stickers',
              subtitle: 'error_loading_stickers',
            }}
          >
            <div className="text-center">
              <div className="alert background-l-primary">
                <h5>Stickers Data Not Available</h5>
                <p>Unable to load Stickers details. Please go back and try editing again.</p>
                <SolidButton className="btn-primary" onClick={() => router.push(ROUTES.STICKERS)}>
                  Back to Stickers List
                </SolidButton>
              </div>
            </div>
          </CardWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default EditStickersError
