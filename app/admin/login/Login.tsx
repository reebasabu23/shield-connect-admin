import { Table } from 'reactstrap'

interface LoginTableProps {
  setFieldValue: (field: string, value: any) => void
}

const LoginTable = ({ setFieldValue }: LoginTableProps) => {
  const handleCopy = (identifier: string, password: string) => {
    navigator.clipboard.writeText(`${identifier} | ${password}`)

    setFieldValue('identifier', identifier)
    setFieldValue('password', password)
  }

  return (
  <></>
  )
}

export default LoginTable
