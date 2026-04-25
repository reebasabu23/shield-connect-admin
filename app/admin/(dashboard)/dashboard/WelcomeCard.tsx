import { Button, Card, CardBody, Col } from 'reactstrap'
import { Image } from '@/app/components/image'
import { queries } from '@/lib/api'
import { useRouter } from 'next/navigation'

const WelcomeCard = () => {
  const { data } = queries.useGetUserDetails()
  const router = useRouter()
  const navigate = (path: any) => router.push(path)

  return (
    <Col xxl="4" md="6" xs="12" className="col-xxx-custom custom-order-1">
      <Card>
        <CardBody className="welcome-card">
          <Image src="/welcome-bg.png" alt="welcome" />
          <div className="welcome-content">
            <h2>Welcome {data?.user.name || 'Admin'}</h2>
            <p>Here’s what’s happening in your chat app today</p>
            <Button onClick={() => router.push('/profile')}>View Profile</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}
export default WelcomeCard
